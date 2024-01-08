---
# Feel free to add content and custom Front Matter to this file.
# To modify the layout, see https://jekyllrb.com/docs/themes/#overriding-theme-defaults
layout: default
title: algorithms
permalink: /algorithms/
redirect_from: 
  - /algoritmes/
  - /numerlieke_methodes/
  - /numerical_methods/
banner_image: "/images/curricula/banner_algorithms.png"
logo_image: "/images/curricula/logo_algorithms.png"
partner_images: ['/images/partners/ugent.svg', '/images/partners/dwengo.png', '/images/partners/istem.png']
learning_paths: ['anm1', 'anm2', 'anm3', 'anm4', 'anm11', 'anm12', 'anm13', 'anm14', 'anm15','anm16','anm17','maths_epidemie', 'stem_insectbooks']
---


{% capture intro_title %} {{ site.translations[site.lang].algorithms.intro_title }} {% endcapture %}
{% capture paragraph1 %} {{ site.translations[site.lang].algorithms.paragraph1 }} {% endcapture %}
{% capture paragraph2 %} {{ site.translations[site.lang].algorithms.paragraph2 }} {% endcapture %}
{% capture paragraph3 %} {{ site.translations[site.lang].algorithms.paragraph3 }} {% endcapture %}


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

{%- include curricula_files.html page_translation_key="algorithms" -%}

{%- include partners.html images=page.partner_images -%}