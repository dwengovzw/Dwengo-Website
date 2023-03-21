---
layout: default
title: "AI Op School"
permalink: /aiopschool/
redirect_from: 
  - /aiatschool/
banner_image: "/images/aiopschool/banner_wide.jpg"
logo_image: "/images/aiopschool/logo.svg"
partner_images: ['/images/partners/ugent.svg', '/images/partners/logoCollectiveUp.svg', '/images/partners/dwengo.png', '/images/partners/istem.png', '/images/partners/2link2.png', '/images/partners/hogent.svg', '/images/partners/pov.jpg' , '/images/partners/onderwijsvlaanderen.png']
learning_paths: [""]
curricula: ['kiks', 'socialrobot', 'agriculture', 'art', 'computational_thinking', 'care', 'chatbot']
---

{% capture intro_title %} {{ site.translations[site.lang].aiopschool.intro_title }} {% endcapture %}
{% capture paragraph1 %} {{ site.translations[site.lang].aiopschool.paragraph1 }} {% endcapture %}
{% capture paragraph2 %} {{ site.translations[site.lang].aiopschool.paragraph2 }} {% endcapture %}

{%- include frontpage_header_template.html banner_url=page.banner_image project_logo_url=page.logo_image
intro_title=intro_title
paragraph1=paragraph1
paragraph2=paragraph2
-%}

{%- include curricula.html curricula_pages=page.curricula -%}