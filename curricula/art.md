---
# Feel free to add content and custom Front Matter to this file.
# To modify the layout, see https://jekyllrb.com/docs/themes/#overriding-theme-defaults

layout: default
title: art
permalink: /art/
banner_image: "/images/curricula/banner_art.png"
logo_image: "/images/curricula/logo_art.png"
partner_images: ['/images/partners/ugent.svg', '/images/partners/dwengo.svg']
learning_paths: ['Werken met notebooks - Python', 'jommeke-vooroordelen-van-ai']
---

{% capture intro_title %} {{ site.translations[site.lang].art.intro_title }} {% endcapture %}
{% capture paragraph1 %} {{ site.translations[site.lang].art.paragraph1 }} {% endcapture %}
{% capture paragraph2 %} {{ site.translations[site.lang].art.paragraph2 }} {% endcapture %}
{% capture paragraph3 %} {{ site.translations[site.lang].art.paragraph3 }} {% endcapture %}


{%- include frontpage_header_template.html banner_url=page.banner_image project_logo_url=page.logo_image
intro_title=intro_title
paragraph1=paragraph1
paragraph2=paragraph2
paragraph3=paragraph3
-%}

Here we can put some extra information about this project. This can be done by adding content to the page in markdown format or by creating an html template with its own css in the _includes folder and linking it using the jekyll liquid include tag.

{% assign begin = '{"hruids": ' %}
{% assign end = '}' %}
{% assign full = "'" | append: begin | append: page.learning_paths | append: end | append: "'" %}
{% capture lp_filter %} {{ full }} {% endcapture %}

{%- include learning_paths.html filter_object=lp_filter -%}

{%- include partners.html images=page.partner_images -%}