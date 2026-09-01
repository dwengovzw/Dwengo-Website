---
layout: default
title: "Grip->IT"
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
{% capture challenge_title %} {{ site.translations[site.lang].gripit.challenge_title }} {% endcapture %}
{% capture challenge %} {{ site.translations[site.lang].gripit.challenge }} {% endcapture %}
{% capture learning_title %} {{ site.translations[site.lang].gripit.learning_title }} {% endcapture %}
{% capture learning %} {{ site.translations[site.lang].gripit.learning }} {% endcapture %}
{% capture tools_title %} {{ site.translations[site.lang].gripit.tools_title }} {% endcapture %}
{% capture tools %} {{ site.translations[site.lang].gripit.tools }} {% endcapture %}
{% capture pilot_title %} {{ site.translations[site.lang].gripit.pilot_title }} {% endcapture %}
{% capture pilot %} {{ site.translations[site.lang].gripit.pilot }} {% endcapture %}

{%- include frontpage_header_template.html banner_url=page.banner_image project_logo_url=page.logo_image
intro_title=intro_title
paragraph1=paragraph1
paragraph2=paragraph2
-%}

{%- include page_wide_info_banner.html text=banner_info button_text="kiks.form_button_text" -%}

<div style="max-width: 960px; margin: 2rem auto 1rem; padding: 0 1rem;">
    <video controls playsinline preload="metadata" style="width: 100%; height: auto; border-radius: 12px; box-shadow: 0 8px 24px rgba(0,0,0,0.12); background: #000;">
        <source src="/assets/video/gripit/20260821_Halberd-teaser.mp4" type="video/mp4">
        Your browser does not support the video tag.
    </video>
</div>

<section class="page-content">
    <h2>{{ challenge_title }}</h2>
    <p>{{ challenge }}</p>

    <h2>{{ learning_title }}</h2>
    <p>{{ learning }}</p>

    <h2>{{ tools_title }}</h2>
    <p>{{ tools }}</p>

    <h2>{{ pilot_title }}</h2>
    <p>{{ pilot }}</p>
</section>


{% assign begin = '{"hruids": ' %}
{% assign end = '}' %}
{% assign full = "'" | append: begin | append: page.learning_paths | append: end | append: "'" %}
{% capture lp_filter %} {{ full }} {% endcapture %}


{%- include partners.html images=page.partner_images -%}