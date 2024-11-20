---
# Feel free to add content and custom Front Matter to this file.
# To modify the layout, see https://jekyllrb.com/docs/themes/#overriding-theme-defaults

layout: default
curricula: ['kiks', 'socialrobot', 'agriculture', 'art', 'wegostem', 'computational_thinking', 'math_with_python', 'python_programming', 'stem', 'care', 'chatbot', 'physical_computing', 'algorithms', 'basics_ai']
---

{% capture intro_title %} {{ site.translations[site.lang].strengths.title }} {% endcapture %}
{% capture paragraph1 %} {{ site.translations[site.lang].strengths.summary }} {% endcapture %}
{% capture paragraph2 %} {{ site.translations[site.lang].strengths.main }} {% endcapture %}
{% capture paragraph3 %} 
<div class="strengths_container">
        <div class="research_component strength-container">
            <p><img src="/images/strengths/value-innovation.png" alt="Innovatief" width="500" height="500"/></p>
            <p><strong>{% t strengths.innovative %}</strong></p>
        </div>
        <div class="research_component strength-container">
            <p><img src="/images/strengths/value-research.png" alt="Research-based" width="500" height="500"/></p>
            <p><strong>{% t strengths.research_based %}</strong></p>
        </div>
        <div class="research_component strength-container">
            <p><img src="/images/strengths/value-inclusion.png" alt="Inclusive" width="500" height="500"/></p>
            <p><strong>{% t strengths.inclusive %}</strong></p>
        </div>
        <div class="research_component strength-container">
            <p><img src="/images/strengths/value-society.png" alt="Socially relevant" width="500" height="500"/></p>
            <p><strong>{% t strengths.socially_relevant %}</strong></p>
        </div>
    </div>
{% endcapture %}


{%- include frontpage_header_template.html banner_url="/images/frontpage_banners/Dwengo-Artbot.jpg" project_logo_url=""
intro_title=intro_title
paragraph1=paragraph1
paragraph2=paragraph2
paragraph3=paragraph3
additional_classname="frontpage_frontpage_banner"
-%}

{%- include project_highlights.html -%}

{%- include usage_website.html -%}

{%- include curricula.html curricula_pages=page.curricula -%}

{%- include learning_paths_search.html keyword="none" -%}





