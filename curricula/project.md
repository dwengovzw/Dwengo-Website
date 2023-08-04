---
# Feel free to add content and custom Front Matter to this file.
# To modify the layout, see https://jekyllrb.com/docs/themes/#overriding-theme-defaults

layout: default
title: project
permalink: /project/
banner_image: "/images/curricula/banner_computational_thinking.png"
logo_image: "/images/curricula/logo_computational_thinking.png"
partner_images: ['/images/partners/ugent.svg', '/images/partners/dwengo.png', '/images/partners/pov.jpeg', '/images/partners/hogent.svg', '/images/partners/istem.png', '/images/partners/vlaanderen.svg']
learning_paths: ['ct1_concepten', 'ct2_concreet', 'ct3_voorbeelden', 'ct10_bebras', 'ct4_evaluatiekader', 'ct5_kijkwijzer', 'ct6_cases', 'ct7_historiek', 'ct8_eindtermen', 'ct9_impact']
---

{% capture page_title %} {{ site.translations[site.lang].project.page_title }} {% endcapture %}
{% capture intro %} {{ site.translations[site.lang].project.intro }} {% endcapture %}
{% capture summary %} {{ site.translations[site.lang].project.summary }} {% endcapture %}


{%- include project_header_template.html banner_url=page.banner_image project_logo_url=page.logo_image
page_title=page_title
intro=intro
summary=summary
-%}

{%- include project_extra_info.html -%}

{% assign begin = '{"hruids": ' %}
{% assign end = '}' %}
{% assign full = "'" | append: begin | append: page.learning_paths | append: end | append: "'" %}
{% capture lp_filter %} {{ full }} {% endcapture %}

{%- include learning_paths.html filter_object=lp_filter -%}

{%- include partners.html images=page.partner_images -%}