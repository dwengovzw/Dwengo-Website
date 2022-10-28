---
# Feel free to add content and custom Front Matter to this file.
# To modify the layout, see https://jekyllrb.com/docs/themes/#overriding-theme-defaults

layout: default
title: wegostem
permalink: /wegostem/
banner_image: "/images/curricula/banner_wegostem.png"
logo_image: "/images/curricula/logo_wegostem.png"
partner_images: ['/images/partners/ugent.svg', '/images/partners/dwengo.png', '/images/partners/vito.png', '/images/partners/flandersmake.jpeg', '/images/partners/kuleuven.png', '/images/partners/kbc.png', '/images/partners/dssmith.jpeg', '/images/partners/cegeka.png', '/images/partners/att.png']
learning_paths: ['wegostem_lkr-v1', 'wegostem_lln-v1']
---

{% capture intro_title %} {{ site.translations[site.lang].wegostem.intro_title }} {% endcapture %}
{% capture paragraph1 %} {{ site.translations[site.lang].wegostem.paragraph1 }} {% endcapture %}
{% capture paragraph2 %} {{ site.translations[site.lang].wegostem.paragraph2 }} {% endcapture %}
{% capture paragraph3 %} {{ site.translations[site.lang].wegostem.paragraph3 }} {% endcapture %}


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