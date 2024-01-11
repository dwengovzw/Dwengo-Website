---
layout: default
title: KIKS
permalink: /kiks_test/
banner_image: "/images/curricula/banner_kiks.png"
logo_image: "/images/curricula/logo_kiks.png"
partner_images: ['/images/partners/sintbavo.png', '/images/partners/kae.png', '/images/partners/ugent.svg','/images/partners/meise.png', '/images/partners/dwengo.png', '/images/partners/accenture.svg', '/images/partners/oost-vlaanderen.svg', '/images/partners/rvo-society.svg', '/images/partners/imec.svg', '/images/partners/vlaanderen.svg', '/images/partners/vlaams-brabant.svg', '/images/partners/veranderwijs.png']
learning_paths: ['pn_werking', 'un_artificiele_intelligentie', 'pn_klimaatverandering', 'kiks1_microscopie', 'kiks2_practicum', 'pn_digitalebeelden', 'kiks3_dl_basis', 'kiks4_dl_gevorderd', 'kiks5_classificatie', 'kiks6_regressie', 'kiks7_ethiek', 'kiks8_eindtermen']
---

{% capture intro_title %} {{ site.translations[site.lang].kiks.intro_title }} {% endcapture %}
{% capture paragraph1 %} {{ site.translations[site.lang].kiks.paragraph1 }} {% endcapture %}
{% capture paragraph2 %} {{ site.translations[site.lang].kiks.paragraph2 }} {% endcapture %}
{% capture paragraph3 %} {{ site.translations[site.lang].kiks.paragraph3 }} {% endcapture %}


{%- include frontpage_header_template_video.html banner_url=page.banner_image project_logo_url=page.logo_image
embed_url="https://www.youtube.com/embed/dO-E33G20co?si=BamS4vwxlhDPnUvc"
-%}

{%- include kiks_test_extra_info.html filter_object='{"hruids": ["pn_werking"] }' -%}

{%- include highlightbox.html text="kiks.form_text" button_text="kiks.form_button_text" -%}

{% assign begin = '{"hruids": ' %}
{% assign end = '}' %}
{% assign full = "'" | append: begin | append: page.learning_paths | append: end | append: "'" %}
{% capture lp_filter %} {{ full }} {% endcapture %}

{%- include learning_paths.html filter_object=lp_filter -%}

{%- include curricula_files.html page_translation_key="kiks" -%}

{%- include partners.html images=page.partner_images -%}