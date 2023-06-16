---
# Feel free to add content and custom Front Matter to this file.
# To modify the layout, see https://jekyllrb.com/docs/themes/#overriding-theme-defaults

layout: default
title: STEM
permalink: /stem/
banner_image: "/images/curricula/banner_stem.png"
logo_image: "/images/curricula/logo_stem.png"
partner_images: ['/images/partners/ugent.svg', '/images/partners/dwengo.png']
learning_paths: ['pn_werking', 'maths_spreidingsdiagrammen', 'pn_digitalebeelden', 'maths_epidemie', 'stem_ipadres', 'pn_klimaatverandering', 'stem_rechten','stem_lineaireregressie', 'stem_insectbooks']
---

{% capture intro_title %} {{ site.translations[site.lang].stem.intro_title }} {% endcapture %}
{% capture paragraph1 %} {{ site.translations[site.lang].stem.paragraph1 }} {% endcapture %}
{% capture paragraph2 %} {{ site.translations[site.lang].stem.paragraph2 }} {% endcapture %}
{% capture paragraph3 %} {{ site.translations[site.lang].stem.paragraph3 }} {% endcapture %}


{%- include frontpage_header_template.html banner_url=page.banner_image project_logo_url=page.logo_image
intro_title=intro_title
paragraph1=paragraph1
paragraph2=paragraph2
paragraph3=paragraph3
-%}

{% assign begin = '{"hruids": ' %}
{% assign end = '}' %}
{% assign full = "'" | append: begin | append: page.learning_paths | append: end | append: "'" %}
{% capture lp_filter %} {{ full }} {% endcapture %}

{%- include learning_paths.html filter_object=lp_filter -%}

{%- include partners.html images=page.partner_images -%}