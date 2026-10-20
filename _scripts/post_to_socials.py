"""
Post Dwengo news articles to Facebook and LinkedIn.

Scans all _news/**/*.md files. For each file with `to_socials: true`:
  If no post ID is recorded in _social_posts.json → create a new post and save the ID.
  LinkedIn includes Markdown images (PNG/JPEG/GIF, up to 20 unique images).
  Site-root paths, article-relative paths and public HTTP(S) URLs are supported.
  If an image fails to load/upload/process, the LinkedIn post is skipped for retry.

Dependencies: requests, pyyaml, markdown-it-py.

Required environment variables:
  FACEBOOK_PAGE_TOKEN    Facebook Page access token  (optional, skipped if absent)
  FACEBOOK_PAGE_ID       Facebook Page ID            (optional, skipped if absent)
  LINKEDIN_ACCESS_TOKEN  LinkedIn OAuth 2 access token for the organisation (optional)
  LINKEDIN_ORG_ID        LinkedIn numeric organisation ID                   (optional)
"""

import json
import os
import re
import sys
import time
from pathlib import Path
from urllib.parse import quote, unquote, urlsplit

import requests
import yaml
from markdown_it import MarkdownIt
import functools
from inspect import signature

# ---------------------------------------------------------------------------
# Constants
# ---------------------------------------------------------------------------
SOCIAL_POSTS_FILE = "_scripts/_social_posts.json"
WEBSITE_URL = "https://www.dwengo.org"
FACEBOOK_GRAPH_VERSION = os.getenv("FACEBOOK_GRAPH_VERSION", "v23.0")
LINKEDIN_VERSION = os.getenv("LINKEDIN_VERSION", "202606")
LINKEDIN_MAX_CHARS = 3000
FACEBOOK_MAX_CHARS = 63206  # practical limit for page posts
REPOSITORY_ROOT = Path(__file__).resolve().parents[1]
LINKEDIN_MAX_IMAGES = 20

class PostTooLongException(Exception):
    pass

# ---------------------------------------------------------------------------
# News file discovery
# ---------------------------------------------------------------------------
def find_news_files() -> list[str]:
    return sorted(p.as_posix() for p in Path("_news").rglob("*.md"))


# ---------------------------------------------------------------------------
# Frontmatter / content helpers
# ---------------------------------------------------------------------------
def parse_frontmatter(filepath: str) -> tuple[dict, str]:
    """Return (metadata_dict, body_text) for a Jekyll markdown file."""
    file = Path(filepath).read_text(encoding="utf-8")
    _, metadata, content = file.split("---", 2)

    metadata = yaml.safe_load(metadata) or {}
    return metadata, content.strip()


def strip_markdown(text: str) -> str:
    """Remove the most common markdown / HTML syntax from text."""
    text = re.sub(r"!\[.*?\]\(.*?\)", "", text)                 # markdown images
    text = re.sub(r"!\[[^\]]*\]\[[^\]]*\]", "", text)          # reference images
    text = re.sub(r"\[([^\]]+)\]\(([^\)]+)\)", r"\1 (\2)", text)  # keep link label and URL
    text = re.sub(r"<[^>]+>", "", text)                         # HTML tags (everything inside "<>" is deleted)
    text = re.sub(r"^#{1,6}\s+", "", text, flags=re.MULTILINE)  # markdown headings
    text = re.sub(r"\*{1,3}([^*]+)\*{1,3}", r"\1", text)        # markdown bold / italic
    text = re.sub(r"\n{3,}", "\n\n", text)                      # newlines are restricted to 2 max
    return text.strip()


def build_post_text(title: str, body: str, article_url: str, max_chars: int) -> str:
    """Combine title, body excerpt, and URL within *max_chars*."""
    suffix = f"\n\n{article_url}"
    available_for_body = max_chars - len(title) - 2 - len(suffix)
    if available_for_body <= 0:
        raise PostTooLongException
    if len(body) > available_for_body:
        body = body[: available_for_body - 3].rstrip() + "..."
    return f"{title}\n\n{body}{suffix}"


def extract_markdown_images(body: str) -> list[tuple[str, str]]:
    """Extract (source, alt text) in document order, ignoring code examples."""
    images = []
    seen = set()
    for block in MarkdownIt().parse(body):
        for token in block.children or []:
            if token.type == "image":
                source = token.attrGet("src")
                if source and source not in seen:
                    images.append((source, token.content))
                    seen.add(source)
    return images


def read_post_image(source: str, news_file: str) -> tuple[bytes, str]:
    """Read site-root/article-relative paths or public HTTP(S) images."""
    parsed = urlsplit(source)
    if parsed.scheme in ("http", "https") or source.startswith("//"):
        url = "https:" + source if source.startswith("//") else source
        response = requests.get(url, timeout=30)
        response.raise_for_status()
        data = response.content
    else:
        if parsed.scheme:
            raise ValueError(f"Unsupported image URL scheme: {parsed.scheme}")
        path = unquote(parsed.path)
        base = REPOSITORY_ROOT if path.startswith("/") else Path(news_file).resolve().parent
        image_path = (base / path.lstrip("/")).resolve()
        if not image_path.is_relative_to(REPOSITORY_ROOT):
            raise ValueError("Image path must stay inside the repository")
        data = image_path.read_bytes()

    # Check the actual format, including for URLs without a file extension.
    if data.startswith(b"\x89PNG\r\n\x1a\n"):
        return data, "image/png"
    if data.startswith(b"\xff\xd8\xff"):
        return data, "image/jpeg"
    if data.startswith((b"GIF87a", b"GIF89a")):
        return data, "image/gif"
    raise ValueError(f"LinkedIn images must be PNG, JPEG or GIF: {source}")


# ---------------------------------------------------------------------------
# Tracking file
# ---------------------------------------------------------------------------
def load_posted_news() -> dict:
    if os.path.exists(SOCIAL_POSTS_FILE):
        with open(SOCIAL_POSTS_FILE, encoding="utf-8") as f:
            return json.load(f)
    print("No _social_posts file found")
    return {}


def save_posted_news(data: dict) -> None:
    with open(SOCIAL_POSTS_FILE, "w", encoding="utf-8") as f:
        json.dump(data, f, indent=2, ensure_ascii=False)
        f.write("\n")

# ---------------------------------------------------------------------------
# Facebook
# ---------------------------------------------------------------------------
def create_facebook_post(text: str, page_token: str, page_id: str) -> str:
    url = f"https://graph.facebook.com/{FACEBOOK_GRAPH_VERSION}/{page_id}/feed"
    resp = requests.post(
        url,
        data={"message": text, "published": "true", "access_token": page_token},
        timeout=30,
    )
    resp.raise_for_status()
    return resp.json()["id"]

# ---------------------------------------------------------------------------
# LinkedIn Posts API
# ---------------------------------------------------------------------------
def refresh_linkedin_access_token(refresh_token, client_id, client_secret):
    resp = requests.post(
        "https://www.linkedin.com/oauth/v2/accessToken",
        data={
            "grant_type": "refresh_token",
            "refresh_token": refresh_token,
            "client_id": client_id,
            "client_secret": client_secret,
        },
        headers={"Content-Type": "application/x-www-form-urlencoded"},
        timeout=30,
    )
    resp.raise_for_status()
    data = resp.json()
    return data["access_token"]

def linkedin_auto_refresh(func):
    func_signature = signature(func)

    @functools.wraps(func)
    def wrapper(*args, **kwargs):
        try:
            return func(*args, **kwargs)

        except requests.HTTPError as e:
            response = getattr(e, "response", None)

            if response is None or response.status_code != 401:
                raise

            print("LinkedIn token expired; refreshing access token...")

            refresh_token = os.getenv("LINKEDIN_REFRESH_TOKEN")
            client_id = os.getenv("LINKEDIN_CLIENT_ID")
            client_secret = os.getenv("LINKEDIN_CLIENT_SECRET")

            if not all([refresh_token, client_id, client_secret]):
                raise RuntimeError(
                    "LinkedIn access token expired, but refresh credentials are missing. "
                    "Set LINKEDIN_REFRESH_TOKEN, LINKEDIN_CLIENT_ID, and LINKEDIN_CLIENT_SECRET."
                ) from e

            new_token = refresh_linkedin_access_token(
                refresh_token,
                client_id,
                client_secret
            )

            # update runtime token
            os.environ["LINKEDIN_ACCESS_TOKEN"] = new_token

            # retry once with new token
            bound_args = func_signature.bind(*args, **kwargs)
            bound_args.arguments["access_token"] = new_token
            return func(*bound_args.args, **bound_args.kwargs)

    return wrapper

@linkedin_auto_refresh
def linkedin_request(method: str, url: str, access_token: str, **kwargs):
    """Make an authenticated LinkedIn request, refreshing expired tokens once."""
    headers = {
        "Authorization": f"Bearer {access_token}",
        "Content-Type": "application/json",
        "Linkedin-Version": LINKEDIN_VERSION,
        "X-Restli-Protocol-Version": "2.0.0"
    }
    headers.update(kwargs.pop("headers", {}))
    response = requests.request(method, url, headers=headers, timeout=30, **kwargs)
    response.raise_for_status()
    return response


def upload_linkedin_image(data: bytes, content_type: str, access_token: str, org_id: str) -> str:
    """Upload an image and wait until LinkedIn has finished processing it."""
    def request(method, url, **kwargs):
        return linkedin_request(
            method, url, os.getenv("LINKEDIN_ACCESS_TOKEN", access_token), **kwargs
        )

    response = request(
        "POST", "https://api.linkedin.com/rest/images?action=initializeUpload",
        json={"initializeUploadRequest": {"owner": f"urn:li:organization:{org_id}"}},
    )
    upload = response.json()["value"]
    request("PUT", upload["uploadUrl"], data=data, headers={"Content-Type": content_type})
    image_urn = upload["image"]
    status_url = f"https://api.linkedin.com/rest/images/{quote(image_urn, safe='')}"
    for attempt in range(30):
        status = request("GET", status_url).json()["status"]
        if status == "AVAILABLE":
            return image_urn
        if status not in ("WAITING_UPLOAD", "PROCESSING"):
            raise RuntimeError(f"LinkedIn image processing failed: {status}")
        if attempt < 29:
            time.sleep(2)
    raise RuntimeError("Timed out waiting for LinkedIn image processing")


def escape_linkedin_text(text: str) -> str:
    """Escape reserved little-text characters so LinkedIn displays plain text.

    https://learn.microsoft.com/en-us/linkedin/marketing/community-management/shares/little-text-format
    Apply only to commentary at the API boundary, after building the post.
    """
    return re.sub(r"[\\|{}@\[\]()<>#*_~]", lambda match: "\\" + match.group(0), text)


def create_linkedin_post(
    text: str, access_token: str, org_id: str, images: list[dict] | None = None
) -> str:
    if images and len(images) > LINKEDIN_MAX_IMAGES:
        raise ValueError(f"LinkedIn supports at most {LINKEDIN_MAX_IMAGES} images per post")

    payload = {
        "author": f"urn:li:organization:{org_id}",
        "commentary": escape_linkedin_text(text),
        "visibility": "PUBLIC",
        "distribution": {
            "feedDistribution": "MAIN_FEED",
            "targetEntities": [],
            "thirdPartyDistributionChannels": []
        },
        "lifecycleState": "PUBLISHED",
        "isReshareDisabledByAuthor": False
    }
    if images:
        payload["content"] = (
            {"media": images[0]} if len(images) == 1
            else {"multiImage": {"images": images}}
        )
    resp = linkedin_request(
        "POST", "https://api.linkedin.com/rest/posts",
        os.getenv("LINKEDIN_ACCESS_TOKEN", access_token), json=payload,
    )
    return resp.headers["x-restli-id"]

# ---------------------------------------------------------------------------
# Main
# ---------------------------------------------------------------------------
def main() -> None:
    all_files = find_news_files()

    if not all_files:
        print("No _news markdown files found.")
        return

    fb_token = os.getenv("FACEBOOK_PAGE_TOKEN")
    fb_page_id = os.getenv("FACEBOOK_PAGE_ID")
    li_token = os.getenv("LINKEDIN_ACCESS_TOKEN")
    li_org_id = os.getenv("LINKEDIN_ORG_ID")
    social_posts = load_posted_news()
    ids_updated = False

    for filepath in all_files:
        metadata, body = parse_frontmatter(filepath)

        if not metadata.get("to_socials", False):
            #print(f"  {filepath}: to_socials not set, skipping.")
            continue

        print(f"Processing: {filepath}")
        title = str(metadata.get("title", ""))
        markdown_images = extract_markdown_images(body)
        body = strip_markdown(body)
        base_url = os.getenv("WEBSITE_BASE_URL", WEBSITE_URL).rstrip("/")
        anchor = str(metadata.get("anchor", ""))
        article_url = f"{base_url}/nieuws/#{anchor}" if anchor else f"{base_url}/nieuws/"

        post_ids: dict = social_posts.get(filepath, {})

        # --- Facebook ---
        if fb_token and fb_page_id:
            try:
                fb_text = build_post_text(title, body, article_url, FACEBOOK_MAX_CHARS)
                print(f"Facebook text will be: \n{fb_text}")
                if "facebook_post_id" in post_ids:
                    print("  Facebook post already exists, skipping")
                else:
                    print("  Creating Facebook post")
                    post_id = create_facebook_post(fb_text, fb_token, fb_page_id)
                    post_ids["facebook_post_id"] = post_id
                    social_posts[filepath] = post_ids
                    save_posted_news(social_posts)
                    ids_updated = True
                    print(f"  Facebook post created: {post_id}")
            except PostTooLongException:
                print("   News post is too long to make Facebook post")
            except requests.HTTPError as exc:
                print(f"  Facebook error: {exc}\n  Response: {exc.response.text}", file=sys.stderr)
        else:
            print("  Facebook credentials not configured, skipping.")

        # --- LinkedIn ---
        li_token = os.getenv("LINKEDIN_ACCESS_TOKEN", li_token)
        if li_token and li_org_id:
            try:
                li_text = build_post_text(title, body, article_url, LINKEDIN_MAX_CHARS)
                print(f"Linkedin text will be: \n{li_text}")
                if "linkedin_post_id" in post_ids:
                    print("  Linkedin post already exists, skipping")
                else:
                    if len(markdown_images) > LINKEDIN_MAX_IMAGES:
                        raise ValueError(f"LinkedIn supports at most {LINKEDIN_MAX_IMAGES} images per post")
                    images = []
                    for source, alt_text in markdown_images:
                        print(f"  Uploading LinkedIn image: {source}")
                        data, content_type = read_post_image(source, filepath)
                        image_urn = upload_linkedin_image(data, content_type, li_token, li_org_id)
                        images.append({"id": image_urn, "altText": alt_text[:4086]})
                    print("  Creating LinkedIn post")
                    post_id = create_linkedin_post(li_text, li_token, li_org_id, images)
                    post_ids["linkedin_post_id"] = post_id
                    social_posts[filepath] = post_ids
                    save_posted_news(social_posts)
                    ids_updated = True
                    print(f"  LinkedIn post created: {post_id}")
            except PostTooLongException:
                print("   News post is too long to make Linkedin post")
            except requests.HTTPError as exc:
                print(f"  LinkedIn error: {exc}\n  Response: {exc.response.text}", file=sys.stderr)
            except (OSError, ValueError, RuntimeError, requests.RequestException) as exc:
                print(f"  LinkedIn post skipped: {exc}", file=sys.stderr)
        else:
            print("  LinkedIn credentials not configured, skipping.")

        social_posts[filepath] = post_ids

    if ids_updated:
        save_posted_news(social_posts)
        print("Saved _social_posts.json with new post IDs.")


if __name__ == "__main__":
    main()
