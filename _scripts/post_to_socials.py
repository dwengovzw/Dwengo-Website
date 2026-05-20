"""
Post Dwengo news articles to Facebook and LinkedIn.

Scans all _news/**/*.md files. For each file with `to_socials: true`:
  - If no post ID is recorded in _social_posts.json → create a new post and save the ID.
  - If a post ID is already recorded → update the existing post.

Required environment variables:
  WEBSITE_BASE_URL      – base URL of the site, e.g. https://www.dwengo.org
  FACEBOOK_PAGE_TOKEN   – Facebook Page access token  (optional, skipped if absent)
  FACEBOOK_PAGE_ID      – Facebook Page ID            (optional, skipped if absent)
  LINKEDIN_ACCESS_TOKEN – LinkedIn OAuth 2 access token for the organisation (optional)
  LINKEDIN_ORG_ID       – LinkedIn numeric organisation ID                   (optional)
"""

import json
import os
import re
import sys
from pathlib import Path

import requests
import yaml

# ---------------------------------------------------------------------------
# Constants
# ---------------------------------------------------------------------------
SOCIAL_POSTS_FILE = "_social_posts.json"
LINKEDIN_MAX_CHARS = 3000
FACEBOOK_MAX_CHARS = 63206  # practical limit for page posts


# ---------------------------------------------------------------------------
# News file discovery
# ---------------------------------------------------------------------------
def find_news_files() -> list[str]:
    """Return all _news/**/*.md files as relative POSIX paths."""
    return sorted(
        str(p).replace("\\", "/")
        for p in Path("_news").rglob("*.md")
    )


# ---------------------------------------------------------------------------
# Frontmatter / content helpers
# ---------------------------------------------------------------------------
def parse_frontmatter(filepath: str) -> tuple[dict, str]:
    """Return (metadata_dict, body_text) for a Jekyll markdown file."""
    content = Path(filepath).read_text(encoding="utf-8")
    if content.startswith("---"):
        parts = content.split("---", 2)
        if len(parts) >= 3:
            metadata = yaml.safe_load(parts[1]) or {}
            return metadata, parts[2].strip()
    return {}, content


def strip_markdown(text: str) -> str:
    """Remove the most common markdown / HTML syntax from text."""
    text = re.sub(r"!\[.*?\]\(.*?\)", "", text)            # images
    text = re.sub(r"\[([^\]]+)\]\([^\)]+\)", r"\1", text)  # links → keep label
    text = re.sub(r"<[^>]+>", "", text)                     # HTML tags
    text = re.sub(r"^#{1,6}\s+", "", text, flags=re.MULTILINE)  # headings
    text = re.sub(r"\*{1,3}([^*]+)\*{1,3}", r"\1", text)   # bold / italic
    text = re.sub(r"_{1,3}([^_]+)_{1,3}", r"\1", text)
    text = re.sub(r"```[\s\S]*?```", "", text)              # fenced code
    text = re.sub(r"`[^`]+`", "", text)                     # inline code
    text = re.sub(r"\n{3,}", "\n\n", text)
    return text.strip()


def build_post_text(title: str, body: str, article_url: str, max_chars: int) -> str:
    """Combine title, body excerpt, and URL within *max_chars*."""
    plain = strip_markdown(body)
    suffix = f"\n\n{article_url}"
    # space reserved: len(title) + 2 ("\n\n") + len(plain) + len(suffix)
    available_for_body = max_chars - len(title) - 2 - len(suffix)
    if available_for_body <= 0:
        return (title + suffix)[:max_chars]
    if len(plain) > available_for_body:
        plain = plain[: available_for_body - 3] + "..."
    return f"{title}\n\n{plain}{suffix}"


# ---------------------------------------------------------------------------
# Tracking file
# ---------------------------------------------------------------------------
def load_social_posts() -> dict:
    if os.path.exists(SOCIAL_POSTS_FILE):
        with open(SOCIAL_POSTS_FILE, encoding="utf-8") as f:
            return json.load(f)
    return {}


def save_social_posts(data: dict) -> None:
    with open(SOCIAL_POSTS_FILE, "w", encoding="utf-8") as f:
        json.dump(data, f, indent=2, ensure_ascii=False)
        f.write("\n")


# ---------------------------------------------------------------------------
# Facebook
# ---------------------------------------------------------------------------
def create_facebook_post(text: str, page_token: str, page_id: str) -> str:
    url = f"https://graph.facebook.com/v19.0/{page_id}/feed"
    resp = requests.post(
        url,
        data={"message": text, "access_token": page_token},
        timeout=30,
    )
    resp.raise_for_status()
    return resp.json()["id"]


def update_facebook_post(post_id: str, text: str, page_token: str) -> None:
    url = f"https://graph.facebook.com/v19.0/{post_id}"
    resp = requests.post(
        url,
        data={"message": text, "access_token": page_token},
        timeout=30,
    )
    resp.raise_for_status()


# ---------------------------------------------------------------------------
# LinkedIn (Posts API, version 202411)
# ---------------------------------------------------------------------------
def _linkedin_headers(access_token: str) -> dict:
    return {
        "Authorization": f"Bearer {access_token}",
        "Content-Type": "application/json",
        "LinkedIn-Version": "202411",
        "X-Restli-Protocol-Version": "2.0.0",
    }


def create_linkedin_post(text: str, access_token: str, org_id: str) -> str:
    url = "https://api.linkedin.com/rest/posts"
    payload = {
        "author": f"urn:li:organization:{org_id}",
        "commentary": text,
        "visibility": "PUBLIC",
        "distribution": {
            "feedDistribution": "MAIN_FEED",
            "targetEntities": [],
            "thirdPartyDistributionChannels": [],
        },
        "lifecycleState": "PUBLISHED",
        "isReshareDisabledByAuthor": False,
    }
    resp = requests.post(
        url, headers=_linkedin_headers(access_token), json=payload, timeout=30
    )
    resp.raise_for_status()
    return resp.headers["x-restli-id"]


def update_linkedin_post(post_id: str, text: str, access_token: str) -> None:
    url = f"https://api.linkedin.com/rest/posts/{post_id}"
    payload = {"patch": {"$set": {"commentary": text}}}
    resp = requests.patch(
        url, headers=_linkedin_headers(access_token), json=payload, timeout=30
    )
    resp.raise_for_status()


# ---------------------------------------------------------------------------
# Main
# ---------------------------------------------------------------------------
def main() -> None:
    base_url = os.environ.get("WEBSITE_BASE_URL", "https://www.dwengo.org").rstrip("/")

    all_files = find_news_files()
    if not all_files:
        print("No _news markdown files found.")
        return

    fb_token = os.environ.get("FACEBOOK_PAGE_TOKEN")
    fb_page_id = os.environ.get("FACEBOOK_PAGE_ID")
    li_token = os.environ.get("LINKEDIN_ACCESS_TOKEN")
    li_org_id = os.environ.get("LINKEDIN_ORG_ID")

    social_posts = load_social_posts()
    ids_updated = False

    for filepath in all_files:
        metadata, body = parse_frontmatter(filepath)

        if not metadata.get("to_socials"):
            print(f"  {filepath}: to_socials not set, skipping.")
            continue

        print(f"Processing: {filepath}")
        title = str(metadata.get("title", ""))
        anchor = metadata.get("anchor", "")
        article_url = f"{base_url}/news#{anchor}" if anchor else f"{base_url}/news"

        post_ids: dict = social_posts.get(filepath, {})

        # --- Facebook ---
        if fb_token and fb_page_id:
            fb_text = build_post_text(title, body, article_url, FACEBOOK_MAX_CHARS)
            try:
                if "facebook_post_id" in post_ids:
                    print(f"  Updating Facebook post {post_ids['facebook_post_id']}")
                    update_facebook_post(post_ids["facebook_post_id"], fb_text, fb_token)
                else:
                    print("  Creating Facebook post")
                    post_id = create_facebook_post(fb_text, fb_token, fb_page_id)
                    post_ids["facebook_post_id"] = post_id
                    ids_updated = True
                    print(f"  Facebook post created: {post_id}")
            except requests.HTTPError as exc:
                print(f"  Facebook error: {exc}\n  Response: {exc.response.text}", file=sys.stderr)
        else:
            print("  Facebook credentials not configured, skipping.")

        # --- LinkedIn ---
        if li_token and li_org_id:
            li_text = build_post_text(title, body, article_url, LINKEDIN_MAX_CHARS)
            try:
                if "linkedin_post_id" in post_ids:
                    print(f"  Updating LinkedIn post {post_ids['linkedin_post_id']}")
                    update_linkedin_post(post_ids["linkedin_post_id"], li_text, li_token)
                else:
                    print("  Creating LinkedIn post")
                    post_id = create_linkedin_post(li_text, li_token, li_org_id)
                    post_ids["linkedin_post_id"] = post_id
                    ids_updated = True
                    print(f"  LinkedIn post created: {post_id}")
            except requests.HTTPError as exc:
                print(f"  LinkedIn error: {exc}\n  Response: {exc.response.text}", file=sys.stderr)
        else:
            print("  LinkedIn credentials not configured, skipping.")

        social_posts[filepath] = post_ids

    if ids_updated:
        save_social_posts(social_posts)
        print("Saved _social_posts.json with new post IDs.")


if __name__ == "__main__":
    main()
