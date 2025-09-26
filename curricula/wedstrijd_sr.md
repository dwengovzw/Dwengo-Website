---
# Feel free to add content and custom Front Matter to this file.
# To modify the layout, see https://jekyllrb.com/docs/themes/#overriding-theme-defaults

layout: default
title: socialerobotwedstrijd
permalink: /socialerobotwedstrijd/
redirect_from: 
  - /wedstrijd/
  - /robotwedstrijd/
  - /socialerobot/wedstrijd2025/
banner_image: "/images/curricula/banner_socialrobot.png"
logo_image: "/images/curricula/logo_socialrobot.png"
partner_images: ['/images/partners/dwengo.png','/images/partners/ugent.svg', '/images/partners/onderwijsvlaanderen.png', '/images/partners/comon.png', '/images/partners/istem.png', '/images/partners/oost-vlaanderen.svg',  '/images/partners/pov.jpg', '/images/partners/GO!.png', '/images/partners/kov.png', '/images/partners/ovsg.png', '/images/partners/voop.webp', '/images/partners/uccl_aot_logo.png', '/images/partners/rtc_west_vlaanderen.png', '/images/partners/cno.png', '/images/partners/logo_fluxlab.webp']
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

{%- include wedstrijd_sr_extra_info.html -%}

<div style="font-family: Arial, sans-serif; background: #f4f4f4; display: flex; justify-content: center; align-items: center; height: 80vh; margin: 0;position: relative">

  <!-- Navigation buttons -->
  <div class="buttons" style="position: absolute; top: 50%; width: 100%; display: flex; justify-content: space-between; transform: translateY(-50%);margin: 0 10px">
    <button onclick="prevSlide()" style="background-color: rgba(0, 0, 0, 0.5); border: none; color: white; padding: 10px 20px; cursor: pointer; font-size: 18px; border-radius: 5px;margin-left: 10px;">❮</button>
    <button onclick="nextSlide()" style="background-color: rgba(0, 0, 0, 0.5); border: none; color: white; padding: 10px 20px; cursor: pointer; font-size: 18px; border-radius: 5px;margin-right:10px;">❯</button>
  </div>

<div class="carousel" style="position: relative; width: 80%; max-width: 800px; overflow: hidden; border-radius: 10px; box-shadow: 0 5px 20px rgba(0,0,0,0.2);">
  <div id="carousel-images" style="display: flex; transition: transform 0.5s ease-in-out;">
    <img src="/assets/images/wedstrijd_sr/U6A7109_s.jpg" alt="Slide 1" style="width: 100%; flex-shrink: 0;">
    <img src="/assets/images/wedstrijd_sr/U6A7188_s.jpg" alt="Slide 2" style="width: 100%; flex-shrink: 0;">
    <img src="/assets/images/wedstrijd_sr/U6A7241_s.jpg" alt="Slide 3" style="width: 100%; flex-shrink: 0;">
    <img src="/assets/images/wedstrijd_sr/U6A7276_s.jpg" alt="Slide 4" style="width: 100%; flex-shrink: 0;">
    <img src="/assets/images/wedstrijd_sr/U6A7772_s.jpg" alt="Slide 5" style="width: 100%; flex-shrink: 0;">
    <iframe 
      src="https://www.youtube.com/embed/3WOzwC84_bo?si=w9-iDO3ZkLLbuiTJ" 
      title="YouTube video" 
      allowfullscreen 
      style="width: 100%; flex-shrink: 0; border: none; aspect-ratio: 16/9;">
    </iframe>
    <iframe 
      src="https://www.youtube.com/embed/fe9M7jrcLoo?si=xYMyY_OSy540ZnK9" 
      title="YouTube video" 
      allowfullscreen 
      style="width: 100%; flex-shrink: 0; border: none; aspect-ratio: 16/9;">
    </iframe>
  </div>


  <!-- Play/Pause button -->
  <div style="position: absolute; bottom: 10px; right: 10px;">
    <button id="toggle-autoplay" onclick="toggleAutoplay()" style="background-color: rgba(0, 0, 0, 0.5); border: none; color: white; padding: 8px 16px; cursor: pointer; font-size: 14px; border-radius: 5px;">
      Pause
    </button>
  </div>
</div>

<script>
  let currentIndex = 0;
  let autoplayInterval = null;
  let isPlaying = true;

  function updateCarousel() {
    const carousel = document.getElementById('carousel-images');
    const slideWidth = carousel.clientWidth;
    carousel.style.transform = `translateX(-${currentIndex * slideWidth}px)`;
  }

  function nextSlide() {
    const totalSlides = document.querySelectorAll('#carousel-images > *').length;
    currentIndex = (currentIndex + 1) % totalSlides;
    updateCarousel();
  }

  function prevSlide() {
    const totalSlides = document.querySelectorAll('#carousel-images > *').length;
    currentIndex = (currentIndex - 1 + totalSlides) % totalSlides;
    updateCarousel();
  }

  function startAutoplay() {
    if (!autoplayInterval) {
      autoplayInterval = setInterval(nextSlide, 5000);
    }
  }

  function stopAutoplay() {
    clearInterval(autoplayInterval);
    autoplayInterval = null;
  }

  function toggleAutoplay() {
    const button = document.getElementById('toggle-autoplay');
    if (isPlaying) {
      stopAutoplay();
      button.textContent = "Play";
    } else {
      startAutoplay();
      button.textContent = "Pause";
    }
    isPlaying = !isPlaying;
  }

  window.addEventListener('resize', updateCarousel);

  // Start autoplay by default
  startAutoplay();
</script>

</div>


{%- include curricula_files.html page_translation_key="wedstrijd_sr" -%}

{%- include partners.html images=page.partner_images -%}
