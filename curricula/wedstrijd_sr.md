---
# Feel free to add content and custom Front Matter to this file.
# To modify the layout, see https://jekyllrb.com/docs/themes/#overriding-theme-defaults

layout: default
title: sociale robot
permalink: /socialerobotwedstrijd/
redirect_from: 
  - /wedstrijd/
  - /robotwedstrijd/
  - /socialerobot/wedstrijd2024/
banner_image: "/images/curricula/banner_socialrobot.png"
logo_image: "/images/curricula/logo_socialrobot.png"
partner_images: ['/images/partners/dwengo.png','/images/partners/ugent.svg', '/images/partners/onderwijsvlaanderen.png', '/images/partners/comon.png', '/images/partners/istem.png', '/images/partners/oost-vlaanderen.svg',  '/images/partners/pov.jpg', '/images/partners/GO!.png', '/images/partners/kov.png', '/images/partners/ovsg.png', '/images/partners/voop.webp']
learning_paths: ['sr0_lkr', 'sr0_lln', 'sr1', 'sr2', 'sr3', 'sr4']
---


{% capture page_title %} {{ site.translations[site.lang].wedstrijd_sr.page_title }} {% endcapture %}
{% capture intro %} {{ site.translations[site.lang].wedstrijd_sr.intro }} {% endcapture %}
{% capture summary %} {{ site.translations[site.lang].wedstrijd_sr.summary }} {% endcapture %}

{%- include project_header_template.html banner_url=page.banner_image project_logo_url=page.logo_image
page_title=page_title
intro=intro
summary=summary
-%}

# {% t wedstrijd_sr.title1 %}

{% t wedstrijd_sr.t1p1 %}

# {% t wedstrijd_sr.title2 %}

{% t wedstrijd_sr.t2p1 %}

# {% t wedstrijd_sr.title3 %}

{% t wedstrijd_sr.t3p1 %}


# {% t wedstrijd_sr.title4 %}

{% t wedstrijd_sr.t4p1 %}

<br>



{%- include curricula_files.html page_translation_key="wedstrijd_sr" -%}

{%- include partners.html images=page.partner_images -%}