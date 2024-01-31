---
# Feel free to add content and custom Front Matter to this file.
# To modify the layout, see https://jekyllrb.com/docs/themes/#overriding-theme-defaults

layout: default
title: computational thinking
permalink: /computational_thinking/
redirect_from: 
  - /Computationeel_Denken/
  - /computationeel_denken/
  - /ComputationeelDenken/
  - /Computationeeldenken/
  - /computationeeldenken/
  - /aiopschool/computationeeldenken/
banner_image: "/images/curricula/banner_computational_thinking.png"
logo_image: "/images/curricula/logo_computational_thinking.png"
partner_images: ['/images/partners/ugent.svg', '/images/partners/dwengo.png', '/images/partners/pov.jpeg', '/images/partners/hogent.svg', '/images/partners/istem.png', '/images/partners/vlaanderen.svg']
learning_paths: ['ct1_concepten', 'ct2_concreet', 'ct3_voorbeelden', 'ct6_cases', 'ct9_impact', 'ct10_bebras', 'ct8_eindtermen', 'ct7_historiek', 'ct5_kijkwijzer', 'ct4_evaluatiekader']
---

{% capture page_title %} {{ site.translations[site.lang].computational_thinking.page_title }} {% endcapture %}
{% capture intro %} {{ site.translations[site.lang].computational_thinking.intro }} {% endcapture %}
{% capture summary %} {{ site.translations[site.lang].computational_thinking.summary }} {% endcapture %}

{%- include project_header_template.html banner_url=page.banner_image project_logo_url=page.logo_image
page_title=page_title
intro=intro
summary=summary
-%}

{%- include computational_thinking_extra_info.html -%}

{% assign begin = '{"hruids": ' %}
{% assign end = '}' %}
{% assign full = "'" | append: begin | append: page.learning_paths | append: end | append: "'" %}
{% capture lp_filter %} {{ full }} {% endcapture %}

{%- include learning_paths.html filter_object=lp_filter -%}

{%- include curricula_files.html page_translation_key="computational_thinking" -%}

{%- include partners.html images=page.partner_images -%}