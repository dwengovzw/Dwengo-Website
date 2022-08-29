---
# Feel free to add content and custom Front Matter to this file.
# To modify the layout, see https://jekyllrb.com/docs/themes/#overriding-theme-defaults

layout: default
title: computational thinking
permalink: /computational_thinking/
banner_image: "/images/curricula/banner_computational_thinking.png"
logo_image: "/images/curricula/logo_computational_thinking.png"
partner_images: ['/images/partners/ugent.svg', '/images/partners/dwengo.png', '/images/partners/pov.jpeg', '/images/partners/hogent.svg', '/images/partners/istem.png', '/images/partners/vlaanderen.svg']
learning_paths: ['Computationeel_denken']
---

{% capture intro_title %} {{ site.translations[site.lang].computational_thinking.intro_title }} {% endcapture %}
{% capture paragraph1 %} {{ site.translations[site.lang].computational_thinking.paragraph1 }} {% endcapture %}
{% capture paragraph2 %} {{ site.translations[site.lang].computational_thinking.paragraph2 }} {% endcapture %}


{%- include frontpage_header_template.html banner_url=page.banner_image project_logo_url=page.logo_image
intro_title=intro_title
paragraph1=paragraph1
paragraph2=paragraph2
-%}

{%- include computational_thinking_extra_info.html -%}

{% assign begin = '{"hruids": ' %}
{% assign end = '}' %}
{% assign full = "'" | append: begin | append: page.learning_paths | append: end | append: "'" %}
{% capture lp_filter %} {{ full }} {% endcapture %}

{%- include learning_paths.html filter_object=lp_filter -%}

{%- include partners.html images=page.partner_images -%}