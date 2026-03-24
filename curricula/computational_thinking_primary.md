---
# Feel free to add content and custom Front Matter to this file.
# To modify the layout, see https://jekyllrb.com/docs/themes/#overriding-theme-defaults

layout: default
title: Computationaleel denken basis
permalink: /computational_thinking_primary/
redirect_from: 
  - /computationeeldenkenbasis
  - /Computationeel_Denken_basis/
  - /computationeel_denken_basis/
banner_image: "/images/curricula/banner_computational_thinking.png"
logo_image: "/images/curricula/logo_computational_thinking.png"
partner_images: ['/images/partners/ugent.svg', '/images/partners/dwengo.png', '/images/partners/istem.png', '/images/partners/vlaanderen.svg']
learning_paths: ['ct2_concreet_basisonderwijs', 'ct6_cases_basisonderwijs', 'ct10_bebras_basisonderwijs', 'ct8_eindtermen_basisonderwijs', 'ct10_ct_in_wiskunde_basisonderwijs', 'ct11_ct_in_stem_basisonderwijs']
---

{% capture page_title %} {{ site.translations[site.lang].computational_thinking_primary.page_title }} {% endcapture %}
{% capture intro %} {{ site.translations[site.lang].computational_thinking_primary.intro }} {% endcapture %}
{% capture summary %} {{ site.translations[site.lang].computational_thinking_primary.summary }} {% endcapture %}

{% capture teaser_title %} {{ site.translations[site.lang].computational_thinking_primary.teaser.title }} {% endcapture %}
{% capture teaser_file %} {{ site.translations[site.lang].computational_thinking_primary.teaser.file }} {% endcapture %}

{%- include project_header_template.html banner_url=page.banner_image project_logo_url=page.logo_image
page_title=page_title
intro=intro
summary=summary
-%}

{%- include teaser_template.html teaser_title=teaser_title teaser_file=teaser_file -%}


{% assign begin = '{"hruids": ' %}
{% assign end = '}' %}
{% assign full = "'" | append: begin | append: page.learning_paths | append: end | append: "'" %}
{% capture lp_filter %} {{ full }} {% endcapture %}

{%- include learning_paths.html filter_object=lp_filter -%}

{%- include curricula_files.html page_translation_key="computational_thinking_primary" -%}

{%- include partners.html images=page.partner_images -%}