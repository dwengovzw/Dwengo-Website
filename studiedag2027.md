---
layout: default
title: studiedag2027
permalink: /studiedag/
banner_image: ""
logo_image: ""
partner_images: ['/images/partners/ugent.svg', '/images/partners/dwengo.png']
learning_paths: [""]
---

{% capture intro_title %} {{ site.translations[site.lang].studiedag.intro_title }} {% endcapture %}
{% capture paragraph1 %} {{ site.translations[site.lang].studiedag.paragraph1 }} {% endcapture %}

{%- include frontpage_header_template.html banner_url=page.banner_image project_logo_url=page.logo_image
intro_title=intro_title
paragraph1=paragraph1
-%}

{%- include partners.html images=page.partner_images -%}
