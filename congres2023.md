---
layout: default
title: congres2023
permalink: /congres2023/
redirect_from: 
  - /congres/
banner_image: "/images/congres2023/banner_congres.png"
logo_image: "/images/congres2023/logo_congres2023.png"
partner_images: ['/images/partners/ugent.svg', '/images/partners/logoCollectiveUp.svg', '/images/partners/dwengo.png', '/images/partners/istem.png', '/images/partners/2link2.png', '/images/partners/hogent.svg', '/images/partners/pov.jpg' , '/images/partners/onderwijsvlaanderen.png', '/images/partners/cofundedEU-nl.png', '/images/partners/digitalbelgium.png']
learning_paths: [""]
---

{% capture intro_title %} {{ site.translations[site.lang].congres.intro_title }} {% endcapture %}
{% capture paragraph1 %} {{ site.translations[site.lang].congres.paragraph1 }} {% endcapture %}
{% capture paragraph2 %} {{ site.translations[site.lang].congres.paragraph2 }} {% endcapture %}
{% capture paragraph3 %} {{ site.translations[site.lang].congres.paragraph3 }} {% endcapture %}

{%- include frontpage_header_template.html banner_url=page.banner_image project_logo_url=page.logo_image
intro_title=intro_title
paragraph1=paragraph1
paragraph2=paragraph2
paragraph3=paragraph3
-%}



{%- include partners.html images=page.partner_images -%}
