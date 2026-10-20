"""Update only the text of one recorded LinkedIn post.

Preview: python -B _scripts/update_linkedin_post.py _news/2026/example.md --dry-run
Update:  python -B _scripts/update_linkedin_post.py _news/2026/example.md
Uses the same dependencies and LinkedIn environment variables as post_to_socials.py.
"""

import argparse
import os
import re
from pathlib import Path
from urllib.parse import quote

import post_to_socials as socials


def update_news_post(news_file: str, dry_run: bool = False) -> None:
    path = Path(news_file).resolve()
    news_root = socials.REPOSITORY_ROOT / "_news"
    if not path.is_relative_to(news_root) or path.suffix != ".md":
        raise ValueError("Choose a Markdown file inside _news")
    key = path.relative_to(socials.REPOSITORY_ROOT).as_posix()
    post_id = socials.load_posted_news().get(key, {}).get("linkedin_post_id")
    if not post_id or not re.fullmatch(r"urn:li:(?:share|ugcPost):\d+", post_id):
        raise ValueError(f"No valid LinkedIn post ID recorded for {key}")

    metadata, body = socials.parse_frontmatter(str(path))
    base_url = os.getenv("WEBSITE_BASE_URL", socials.WEBSITE_URL).rstrip("/")
    anchor = str(metadata.get("anchor", ""))
    article_url = f"{base_url}/nieuws/#{anchor}" if anchor else f"{base_url}/nieuws/"
    title = str(metadata.get("title", ""))
    body = socials.strip_markdown(body)
    # A repair must not silently replace the original text with an excerpt.
    full_text = f"{title}\n\n{body}\n\n{article_url}"
    if len(full_text) > socials.LINKEDIN_MAX_CHARS:
        raise ValueError("Text exceeds the LinkedIn limit; shorten the article before updating")

    print(f"LinkedIn post: {post_id}")
    print(f"Text ({len(full_text)} characters):\n{full_text}")
    if dry_run:
        print("Preview only; no API request sent.")
        return
    access_token = os.getenv("LINKEDIN_ACCESS_TOKEN")
    if not access_token:
        raise RuntimeError("LINKEDIN_ACCESS_TOKEN is not configured")
    response = socials.linkedin_request(
        "POST", f"https://api.linkedin.com/rest/posts/{quote(post_id, safe='')}",
        access_token,
        headers={"X-RestLi-Method": "PARTIAL_UPDATE"},
        json={"patch": {"$set": {"commentary": socials.escape_linkedin_text(full_text)}}},
    )
    if response.status_code != 204:
        raise RuntimeError(f"Unexpected LinkedIn update status: {response.status_code}")
    print("LinkedIn post text updated.")


if __name__ == "__main__":
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("news_file", help="Path of the news Markdown file")
    parser.add_argument("--dry-run", action="store_true", help="Preview without contacting LinkedIn")
    args = parser.parse_args()
    update_news_post(args.news_file, args.dry_run)
