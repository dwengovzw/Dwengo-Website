---
# Feel free to add content and custom Front Matter to this file.
# To modify the layout, see https://jekyllrb.com/docs/themes/#overriding-theme-defaults

layout: default
title: sociale robot
permalink: /socialrobot/
redirect_from: 
  - /socialerobot/
  - /sociale_robot/
  - /aiopschool/socialerobot/
banner_image: "/images/curricula/banner_socialrobot.png"
logo_image: "/images/curricula/logo_socialrobot.png"
partner_images: ['/images/partners/ugent.svg', '/images/partners/dwengo.png', '/images/partners/istem.png', '/images/partners/oost-vlaanderen.svg', '/images/partners/vlaio.png', '/images/partners/hogent.svg', '/images/partners/sap_logo.png']
learning_paths: ['sr0_lkr', 'sr0_lln', 'sr1', 'sr2', 'sr3', 'sr4']
---

{% capture page_title %} {{ site.translations[site.lang].socialrobot.page_title }} {% endcapture %}
{% capture intro %} {{ site.translations[site.lang].socialrobot.intro }} {% endcapture %}
{% capture summary %} {{ site.translations[site.lang].socialrobot.summary }} {% endcapture %}

{%- include project_header_template.html banner_url=page.banner_image project_logo_url=page.logo_image
page_title=page_title
intro=intro
summary=summary
-%}

{%- include social_robot_extra_info.html -%}

{% assign begin = '{"hruids": ' %}
{% assign end = '}' %}
{% assign full = "'" | append: begin | append: page.learning_paths | append: end | append: "'" %}
{% capture lp_filter %} {{ full }} {% endcapture %}

{%- include learning_paths.html filter_object=lp_filter -%}

{%- include curricula_files.html page_translation_key="socialrobot" -%}

{%- include partners.html images=page.partner_images -%}