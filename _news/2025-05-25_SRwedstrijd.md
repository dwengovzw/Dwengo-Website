---
title: "Jong talent bouwt robots voor een betere wereld: finale van Dwengo’s ‘Sociale robot’-wedstrijd"
date: 2025-05-25T15:00:00
item_theme_logo_url: "/images/curricula/logo_socialrobot.png"
language: "nl"
anchor: "finale-sociale robot-07-05-25"
---
Technologie inzetten om maatschappelijke problemen aan te pakken? Dat is precies wat **meer dan duizend jongeren uit de eerste en tweede graad** van het secundair onderwijs 
de voorbije maanden hebben gedaan in de allereerste editie van de [‘Sociale robot’-wedstrijd](https://dwengo.org/socialerobotwedstrijd/) van **Dwengo vzw**.<br> 
Met steun van het **Excellentiefonds 2024-2025** gingen ze de uitdaging aan: ontwerp en bouw een sociale robot die een verschil maakt in de samenleving. Hun begeleidende leerkrachten werden daarbij door Dwengo ondersteund.<br> 

## Een finale vol innovatie en engagement

Uit maar liefst **379 ingeschreven teams** werden uiteindelijk **14 finalisten** geselecteerd op basis van een technische fiche en 
een filmpje waarin ze hun robot voorstellen. 
Op 7 mei stelden deze teams hun creaties voor aan een professionele jury in het Oost-Vlaamse Provinciehuis. 
De jury bestond uit experten uit de technologie-, onderwijs- en sociale sector.

De beoordeling gebeurde op vier belangrijke criteria:
-  **relevantie en originaliteit, begrip en argumentatie** van het gekozen maatschappelijke probleem;
-  **creatieve aanpak en oplossingsgerichtheid** van het team;
-  **technische kwaliteit** van de robot (elektronica, mechanica en computerprogramma);
-  **helderheid van de presentatie**.

## Winnaars 

De winnende teams scoorden hoog op al deze criteria. De hoofdprijzen werden weggekaapt door de robots **Daggoe** van EDUGO (eenzaamheid), **Brave stoel** (mobiliteit bij ouderen) van Tachemoni en **Frosty** (eenzaamheid, medicatie) van Atheneum Schilde. 

<div style="font-family: Arial, sans-serif; background: #f4f4f4; display: flex; justify-content: center; align-items: center; height: 80vh; margin: 0;">

<div class="carousel" style="position: relative; width: 80%; max-width: 800px; overflow: hidden; border-radius: 10px; box-shadow: 0 5px 20px rgba(0,0,0,0.2);">
  <div id="carousel-images" style="display: flex; transition: transform 0.5s ease-in-out;">
    <img src="/assets/images/wedstrijd_sr/U6A7109_s.jpg" alt="Slide 1" style="width: 100%; flex-shrink: 0;">
    <img src="/assets/images/wedstrijd_sr/U6A7188_s.jpg" alt="Slide 2" style="width: 100%; flex-shrink: 0;">
    <img src="/assets/images/wedstrijd_sr/U6A7241_s.jpg" alt="Slide 3" style="width: 100%; flex-shrink: 0;">
    <img src="/assets/images/wedstrijd_sr/U6A7276_s.jpg" alt="Slide 4" style="width: 100%; flex-shrink: 0;">
    <iframe 
      src="https://www.youtube.com/embed/3WOzwC84_bo?si=w9-iDO3ZkLLbuiTJ" 
      title="YouTube video" 
      allowfullscreen 
      style="width: 100%; flex-shrink: 0; border: none; aspect-ratio: 16/9;">
    </iframe>
  </div>
  <div class="buttons" style="position: absolute; top: 50%; width: 100%; display: flex; justify-content: space-between; transform: translateY(-50%);">
    <button onclick="prevSlide()" style="background-color: rgba(0, 0, 0, 0.5); border: none; color: white; padding: 10px 20px; cursor: pointer; font-size: 18px; border-radius: 5px;">❮</button>
    <button onclick="nextSlide()" style="background-color: rgba(0, 0, 0, 0.5); border: none; color: white; padding: 10px 20px; cursor: pointer; font-size: 18px; border-radius: 5px;">❯</button>
  </div>
  <!-- Navigation buttons -->
  <div class="buttons" style="position: absolute; top: 50%; width: 100%; display: flex; justify-content: space-between; transform: translateY(-50%);">
    <button onclick="prevSlide()" style="background-color: rgba(0, 0, 0, 0.5); border: none; color: white; padding: 10px 20px; cursor: pointer; font-size: 18px; border-radius: 5px;">❮</button>
    <button onclick="nextSlide()" style="background-color: rgba(0, 0, 0, 0.5); border: none; color: white; padding: 10px 20px; cursor: pointer; font-size: 18px; border-radius: 5px;">❯</button>
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

Naast de hoofdprijzen werd er een **bijzondere prijs van [Comon](https://comon.gent/nieuws/robotwedstrijd-watermeloenrobot-brengt-ouderen-aan-het-dansen)** uitgereikt voor de robot die het meest aanzet tot 'meer bewegen' – een creatief antwoord op het groeiende 
gezondheidsprobleem van te weinig fysieke activiteit. Deze prijs benadrukt hoe technologie ook kan bijdragen aan een gezondere levensstijl. 
Deze prijs ging naar de **Watermeloen** van PTS Maasmechelen. 

## STEM met een hart

“Deze wedstrijd is écht uniek,” zegt **Francis wyffels**, professor robotica aan de UGent - imec en voorzitter van Dwengo. 
“In dit sterk STEM-project maken jongeren kennis met technologie als middel om echte maatschappelijke impact te creëren. 
Bovendien leren ze niet alleen programmeren, ontwerpen en bouwen, maar ook computationeel denken, samenwerken en communiceren.”

## Spreiding 

De scholen van de deelnemende teams waren verspreid over de verschillende Vlaamse provincies, de verschillende koepels en finaliteiten.
In de finale zaten teams van de B-stroom tot de finaliteit Doorstroom uit de volgende scholen: Atheneum Schilde, EDUGO campus Glorieux Technisch Instituut Oostakker, 
HTISA Gent, Israelitisch Atheneum Jesode-Hatora-Beth-Jacob Antwerpen, PROVIL Lommel, PST Maasmechelen, Sint-Bavohumaniora Gent, Sint-Laurens Zelzate, Sint-Paulusschool campus Sint-Vincentius Anzegem, 
TechnOV Vilvoorde, TSM Mechelen. Hun robots verhelpen eenzaamheid, gaan een verslaving aan roken of gsm-gebruik tegen, zetten aan tot meer bewegen of studeren, 
of helpen de weg te vinden.     

## Ook aan de slag met sociale robots?

**Dwengo vzw** biedt gratis lesmateriaal aan waarmee leerkrachten aan de slag kunnen rond de minimumdoelen STEM in een maatschappelijke context. 
Het lesmateriaal voor het 'Sociale robot'-project vind je [hier](https://www.dwengo.org/socialerobot) op de Dwengo-website.<br>
Wil jij als leerkracht ook binnen een maatschappelijk relevante context werken rond wetenschap en technologie? 
Verken dan zeker onze website.
