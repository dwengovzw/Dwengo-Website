---
layout: default
title: "GripIt"
permalink: /gripit/
redirect_from:
    - /gripit
banner_image: "/images/curricula/banner_physical_computing.png"
logo_image: "/images/curricula/logo_physical_computing.png"
partner_images: ['/images/partners/dwengo.png', '/images/partners/ugent.svg']
learning_paths: []
curricula: []
---


{% capture intro_title %} {{ site.translations[site.lang].gripit.intro_title }} {% endcapture %}
{% capture paragraph1 %} {{ site.translations[site.lang].gripit.paragraph1 }} {% endcapture %}
{% capture paragraph2 %} {{ site.translations[site.lang].gripit.paragraph2 }} {% endcapture %}

{% capture banner_info %} {{ site.translations[site.lang].gripit.banner_info }} {% endcapture %}

{%- include frontpage_header_template.html banner_url=page.banner_image project_logo_url=page.logo_image
intro_title=intro_title
paragraph1=paragraph1
paragraph2=paragraph2
-%}

{%- include page_wide_info_banner.html text=banner_info button_text="kiks.form_button_text" -%}


{% assign begin = '{"hruids": ' %}
{% assign end = '}' %}
{% assign full = "'" | append: begin | append: page.learning_paths | append: end | append: "'" %}
{% capture lp_filter %} {{ full }} {% endcapture %}

{%- include learning_paths.html filter_object=lp_filter -%}

{%- include partners.html images=page.partner_images -%}