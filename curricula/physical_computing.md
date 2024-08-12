---
# Feel free to add content and custom Front Matter to this file.
# To modify the layout, see https://jekyllrb.com/docs/themes/#overriding-theme-defaults

layout: default
title: Physical computing
permalink: /physical_computing/
redirect_from:
    - /physicalcomputing/
banner_image: "/images/curricula/banner_physical_computing.png"
logo_image: "/images/curricula/logo_physical_computing.png"
partner_images: ['/images/partners/dwengo.png', '/images/partners/ugent.svg', "/images/partners/innovet.jpg", "/images/partners/vlaanderen.svg"]
learning_paths: ['pc_starttodwenguino', 'pc_rijdenderobot', 'pc_theremin', 'pc_leerlijn_introductie', 'pc_leerlijn_invoer_verwerking_uitvoer', 'pc_leerlijn_basisprincipes_digitale_elektronica', 'pc_leerlijn_grafisch_naar_tekstueel', 'pc_leerlijn_basis_programmeren', 'pc_leerlijn_van_µc_naar_plc', 'pc_leerlijn_fiches_dwenguino', 'pc_leerlijn_seriele_monitor', 'pc_leerlijn_bus_protocollen', 'pc_leerlijn_wifi', 'pc_leerlijn_fiches_arduino', 'pc_leerlijn_project_lijnvolger', 'pc_leerlijn_project_bluetooth', 'pc_leerlijn_hddclock', 'pc_leerlijn_fysica_valbeweging', 'pc_leerlijn_luchtkwaliteit', 'pc_leerlijn_weerstation', 'pc_leerlijn_g0', 'pc_leerlijn_g1', 'pc_leerlijn_g3', 'pc_leerlijn_g4', 'pc_leerlijn_g5']
---


{% capture intro_title %} {{ site.translations[site.lang].physical_computing.intro_title }} {% endcapture %}
{% capture paragraph1 %} {{ site.translations[site.lang].physical_computing.paragraph1 }} {% endcapture %}
{% capture paragraph2 %} {{ site.translations[site.lang].physical_computing.paragraph2 }} {% endcapture %}
{% capture paragraph3 %} {{ site.translations[site.lang].physical_computing.paragraph3 }} {% endcapture %}


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



