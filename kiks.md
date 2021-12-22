---
# Feel free to add content and custom Front Matter to this file.
# To modify the layout, see https://jekyllrb.com/docs/themes/#overriding-theme-defaults

layout: default
title: KIKS
permalink: /kiks/
---

{% capture intro_title %} {{ site.translations[site.lang].kiks.intro_title }} {% endcapture %}
{% capture paragraph1 %} {{ site.translations[site.lang].kiks.paragraph1 }} {% endcapture %}
{% capture paragraph2 %} {{ site.translations[site.lang].kiks.paragraph2 }} {% endcapture %}
{% capture paragraph3 %} {{ site.translations[site.lang].kiks.paragraph3 }} {% endcapture %}


{%- include frontpage_header_template.html banner_url="/images/kiks/kiks-banner.jpg" project_logo_url="/images/kiks/LogoKIKS.png"
intro_title=intro_title
paragraph1=paragraph1
paragraph2=paragraph2
paragraph3=paragraph3
-%}

{%- include learning_paths.html keyword="kiks"-%}

