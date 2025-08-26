---
layout: default
title: "AI: de basisprincipes"
permalink: /basics_ai/
redirect_from:
    - /basisprincipes_ai
banner_image: "/images/aiopschool/banner_wide.jpg"
logo_image: "/images/curricula/logo_aiopschool_rond.png"
partner_images: ['/images/partners/dwengo.png', '/images/partners/logo_bekina.png', '/images/partners/logo_fluxlab.webp', '/images/partners/vlaio.png', '/images/partners/logo_SMCLEDE.png', '/images/partners/ugent.svg', '/images/partners/istem.png', '/images/partners/oost-vlaanderen.svg', '/images/partners/logo_hoogbloeier.png', '/images/partners/steam_for_auth.png']
learning_paths: ["un_artificiele_intelligentie", "org-dwengo-waisda-beelden-unplugged-fax-lp", "art1", "org-dwengo-waisda-taal-murder-mistery", "org-dwengo-waisda-beelden-emoties-herkennen", "org-dwengo-waisda-beelden-emoties-herkennen-deel2", "org-dwengo-waisda-beelden-teachable-machine", "org-dwengo-waisda-soc-netw-euler", "org-dwengo-waisda-soc-netw-super-soc-netw", "org-dwengo-waisda-rl-intro", "org-dwengo-waisda-rl-training-an-agent", "org-dwengo-waisda-rl-crawling-robot"]
curricula: []
---

{% capture intro_title %} {{ site.translations[site.lang].basics_ai.intro_title }} {% endcapture %}
{% capture paragraph1 %} {{ site.translations[site.lang].basics_ai.paragraph1 }} {% endcapture %}
{% capture paragraph2 %} {{ site.translations[site.lang].basics_ai.paragraph2 }} {% endcapture %}


{%- include frontpage_header_template.html banner_url=page.banner_image project_logo_url=page.logo_image
intro_title=intro_title
paragraph1=paragraph1
paragraph2=paragraph2
-%}



{% assign begin = '{"hruids": ' %}
{% assign end = '}' %}
{% assign full = "'" | append: begin | append: page.learning_paths | append: end | append: "'" %}
{% capture lp_filter %} {{ full }} {% endcapture %}

{%- include learning_paths.html filter_object=lp_filter -%}


{%- include partners.html images=page.partner_images -%}