---
# Feel free to add content and custom Front Matter to this file.
# To modify the layout, see https://jekyllrb.com/docs/themes/#overriding-theme-defaults

layout: default
title: Physical computing
permalink: /robotica/
redirect_from:
    - /robotics/
banner_image: "/images/curricula/banner_physical_computing.png"
logo_image: "/images/curricula/logo_physical_computing.png"
partner_images: ['/images/partners/dwengo.png', '/images/partners/ugent.svg']
learning_paths: ['pc_rijdenderobot', 'sr0_lkr', 'sr0_lln', 'sr1', 'sr2', 'sr3', 'sr4', 'pc_leerlijn_project_lijnvolger', 'agri_lopendeband', 'org-dwengo-waisda-rl-crawling-robot']
---


{% capture intro_title %} {{ site.translations[site.lang].robotica.intro_title }} {% endcapture %}
{% capture paragraph1 %} {{ site.translations[site.lang].robotica.paragraph1 }} {% endcapture %}
{% capture paragraph2 %} {{ site.translations[site.lang].robotica.paragraph2 }} {% endcapture %}
{% capture paragraph3 %} {{ site.translations[site.lang].robotica.paragraph3 }} {% endcapture %}

{% capture teaser_title %} {{ site.translations[site.lang].robotica.teaser.title }} {% endcapture %}
{% capture teaser_file %} {{ site.translations[site.lang].robotica.teaser.file }} {% endcapture %}


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
