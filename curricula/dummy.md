---
# Feel free to add content and custom Front Matter to this file.
# To modify the layout, see https://jekyllrb.com/docs/themes/#overriding-theme-defaults

layout: default
title: dummy
permalink: /dummy/
banner_image: "/images/curricula/banner_kiks.png"
logo_image: "/images/curricula/logo_kiks.png"
partner_images: ['/images/partners/sintbavo.png', '/images/partners/kae.png', '/images/partners/ugent.svg','/images/partners/meise.png', '/images/partners/dwengo.png', '/images/partners/accenture.svg', '/images/partners/oost-vlaanderen.svg', '/images/partners/rvo-society.svg', '/images/partners/imec.svg', '/images/partners/vlaanderen.svg', '/images/partners/vlaams-brabant.svg', '/images/partners/veranderwijs.png']
learning_paths: ['pn_werking', 'un_artificiele_intelligentie', 'pn_klimaatverandering', 'kiks1_microscopie', 'kiks2_practicum', 'pn_digitalebeelden', 'kiks3_dl_basis', 'kiks4_dl_gevorderd', 'kiks5_classificatie', 'kiks6_regressie', 'kiks7_ethiek', 'kiks8_eindtermen']
---

{% capture intro_title %} {{ site.translations[site.lang].dummy.intro_title }} {% endcapture %}
{% capture paragraph1 %} {{ site.translations[site.lang].dummy.paragraph1 }} {% endcapture %}
{% capture paragraph2 %} {{ site.translations[site.lang].dummy.paragraph2 }} {% endcapture %}
{% capture paragraph3 %} {{ site.translations[site.lang].dummy.paragraph3 }} {% endcapture %}


{%- include frontpage_header_template.html banner_url=page.banner_image project_logo_url=page.logo_image
intro_title=intro_title
paragraph1=paragraph1
paragraph2=paragraph2
paragraph3=paragraph3
-%}


{% assign begin = '{"hruids": ' %}
{% assign end = '}' %}
{% assign full = "'" | append: begin | append: page.learning_paths | append: end | append: "'" %}
{% capture lp_filter %} {{ full }} {% endcapture %}

{%- include learning_paths.html filter_object=lp_filter -%}

{%- include partners.html images=page.partner_images -%}