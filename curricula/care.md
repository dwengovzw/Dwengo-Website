---
# Feel free to add content and custom Front Matter to this file.
# To modify the layout, see https://jekyllrb.com/docs/themes/#overriding-theme-defaults

layout: default
title: care
permalink: /care/
redirect_from: 
  - /Zorg/
  - /zorg/
  - /AIZorg/
  - /AIindeZorg/
  - /AIzorg/
  - /AIindezorg/
  - /aizorg/
  - /aiindezorg/
banner_image: "/images/curricula/banner_care.png"
logo_image: "/images/curricula/logo_care.png"
partner_images: ['/images/partners/ugent.svg', '/images/partners/dwengo.png', '/images/partners/istem.png', 'images/partners/pov.jpeg']
learning_paths: ['pn_werking', 'un_artificiele_intelligentie', 'aiz1_zorg', 'aiz2_grafen', 'aiz3_unplugged', 'aiz4_eindtermen']
---

{% capture intro_title %} {{ site.translations[site.lang].care.intro_title }} {% endcapture %}
{% capture paragraph1 %} {{ site.translations[site.lang].care.paragraph1 }} {% endcapture %}
{% capture paragraph2 %} {{ site.translations[site.lang].care.paragraph2 }} {% endcapture %}
{% capture paragraph3 %} {{ site.translations[site.lang].care.paragraph3 }} {% endcapture %}


{%- include frontpage_header_template.html banner_url=page.banner_image project_logo_url=page.logo_image
intro_title=intro_title
paragraph1=paragraph1
paragraph2=paragraph2
paragraph3=paragraph3
-%}

{%- include care_extra_info.html -%}

{% assign begin = '{"hruids": ' %}
{% assign end = '}' %}
{% assign full = "'" | append: begin | append: page.learning_paths | append: end | append: "'" %}
{% capture lp_filter %} {{ full }} {% endcapture %}

{%- include learning_paths.html filter_object=lp_filter -%}

{%- include curricula_files.html page_translation_key="care" -%}

{%- include partners.html images=page.partner_images -%}