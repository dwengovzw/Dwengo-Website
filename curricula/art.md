---
# Feel free to add content and custom Front Matter to this file.
# To modify the layout, see https://jekyllrb.com/docs/themes/#overriding-theme-defaults

layout: default
title: art
permalink: /art/
redirect_from: 
  - /Kunst/
  - /kunst/
  - /AIKunst/
  - /AIindeKunst/
  - /AIkunst/
  - /AIindekunst/
  - /aikunst/
  - /aiindekunst/
  - /aiopschool/kunst/
banner_image: "/images/curricula/banner_art.png"
logo_image: "/images/curricula/logo_art.png"
partner_images: ['/images/partners/ugent.svg', '/images/partners/dwengo.png']
learning_paths: ['pn_werking', 'un_artificiele_intelligentie', 'art1', 'art2', 'art3']
---

{% capture intro_title %} {{ site.translations[site.lang].art.intro_title }} {% endcapture %}
{% capture paragraph1 %} {{ site.translations[site.lang].art.paragraph1 }} {% endcapture %}
{% capture paragraph2 %} {{ site.translations[site.lang].art.paragraph2 }} {% endcapture %}
{% capture paragraph3 %} {{ site.translations[site.lang].art.paragraph3 }} {% endcapture %}

{% capture teaser_title %} {{ site.translations[site.lang].art.teaser.title }} {% endcapture %}
{% capture teaser_file %} {{ site.translations[site.lang].art.teaser.file }} {% endcapture %}


{%- include frontpage_header_template.html banner_url=page.banner_image project_logo_url=page.logo_image
intro_title=intro_title
paragraph1=paragraph1
paragraph2=paragraph2
paragraph3=paragraph3
-%}

{%- include teaser_template.html teaser_title=teaser_title teaser_file=teaser_file -%}


{% assign begin = '{"hruids": ' %}
{% assign end = '}' %}
{% assign full = "'" | append: begin | append: page.learning_paths | append: end | append: "'" %}
{% capture lp_filter %} {{ full }} {% endcapture %}

{%- include learning_paths.html filter_object=lp_filter -%}

{%- include partners.html images=page.partner_images -%}