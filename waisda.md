---
layout: default
title: "wAIsda?"
permalink: /waisda/
banner_image: "/images/aiopschool/banner_wide.jpg"
logo_image: "/images/curricula/logo_aiopschool_rond.png"
partner_images: ['/images/partners/dwengo.png', '/images/partners/logo_bekina.png', '/images/partners/gluon_education_logo.png', '/images/partners/logo_SMCLEDE.png', '/images/partners/ugent.svg', '/images/partners/istem.png', '/images/partners/oost-vlaanderen.svg', '/images/partners/logo_hoogbloeier.png']
learning_paths: [""]
curricula: []
---

{% capture intro_title %} {{ site.translations[site.lang].waisda.intro_title }} {% endcapture %}
{% capture paragraph1 %} {{ site.translations[site.lang].waisda.paragraph1 }} {% endcapture %}
{% capture paragraph2 %} {{ site.translations[site.lang].waisda.paragraph2 }} {% endcapture %}

{% capture banner_info %} {{ site.translations[site.lang].waisda.banner_info }} {% endcapture %}

{%- include frontpage_header_template.html banner_url=page.banner_image project_logo_url=page.logo_image
intro_title=intro_title
paragraph1=paragraph1
paragraph2=paragraph2
-%}

{%- include page_wide_info_banner.html text=banner_info button_text="kiks.form_button_text" -%}

{%- include partners.html images=page.partner_images -%}

<br/>
<br/>
<br/>
<h1>Dit project moet nog starten, bijgevolg is er nog geen lesmateriaal beschikbaar.</h1>

<h4>Indien je op zoek bent naar lesmateriaal over AI kan je altijd terecht op <a href="https://www.dwengo.org/aiopschool">dwengo.org/aiopschool</a></h4>




