---
# Feel free to add content and custom Front Matter to this file.
# To modify the layout, see https://jekyllrb.com/docs/themes/#overriding-theme-defaults

layout: default
title: chatbot
permalink: /chatbot/
banner_image: "/images/curricula/banner_chatbot.png"
logo_image: "/images/curricula/logo_chatbot.png"
partner_images: ['/images/partners/ugent.svg', '/images/partners/dwengo.png', '/images/partners/istem.png', '/images/partners/oost-vlaanderen.svg', '/images/partners/sintbavo.png']
learning_paths: ['pn_werking', 'un_artificiele_intelligentie', 'cb1_chatbot', 'cb2_sentimentanalyse', 'cb3_vervoegmachine', 'cb4_eindtermen']
---

{% capture intro_title %} {{ site.translations[site.lang].chatbot.intro_title }} {% endcapture %}
{% capture paragraph1 %} {{ site.translations[site.lang].chatbot.paragraph1 }} {% endcapture %}
{% capture paragraph2 %} {{ site.translations[site.lang].chatbot.paragraph2 }} {% endcapture %}



{%- include frontpage_header_template.html banner_url=page.banner_image project_logo_url=page.logo_image
intro_title=intro_title
paragraph1=paragraph1
paragraph2=paragraph2
-%}

{%- include chatbot_extra_info.html -%}

{% assign begin = '{"hruids": ' %}
{% assign end = '}' %}
{% assign full = "'" | append: begin | append: page.learning_paths | append: end | append: "'" %}
{% capture lp_filter %} {{ full }} {% endcapture %}

{%- include learning_paths.html filter_object=lp_filter -%}

{%- include curricula_files.html page_translation_key="chatbot" -%}

{%- include partners.html images=page.partner_images -%}