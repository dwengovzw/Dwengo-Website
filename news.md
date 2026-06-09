---
layout: default
title: news
permalink: /nieuws/
pagination:
  enabled: true
  collection: news
  per_page: 12
  sort_field: date
  sort_reverse: true
  permalink: "/page/:num/"
  trail:
    before: 1
    after: 1
---

{%- if paginator and paginator.posts -%}
{%- include news.html news=paginator.posts -%}
{%- else -%}
{%- include news.html news=site.news -%}
{%- endif -%}