<script setup></script>
<template>
  <article class="wrapper-wide">
    <hr class="semi" />
    <div
      class="pathname-container"
      role="region"
      aria-labelledby="pagePathHeading"
      aria-hidden="false"
    ></div>
    <h1
      style="font-size: var(--font-size-1)"
      id="pagePathHeading"
      class="reveal"
      role="heading"
      aria-level="1"
      aria-label="Page Title: For Press"
    >
      Press Resources
    </h1>
    <hr class="reveal" role="separator" aria-label="Separator" />
    <!-- PRESS MATERIALS GRID START -->
    <div
      class="reveal"
      id="gallery-press"
      role="grid"
      aria-label="Press Materials Grid"
    >
      <!-- BRAND GUIDE START -->
      <a
        class="gallery-item"
        href="https://slavic.media/press-resources/brand-guide.pdf"
        rel="noopener noreferrer nofollow"
        target="_blank"
        aria-label="Link to Brand Guide"
      >
        <h2
          style="font-size: var(--font-size-2)"
          id="brandGuideHeading"
          aria-label="Brand Guide Title"
        >
          Brand Guide
        </h2>

        <div class="grid-item" id="brand-guide" role="gridcell"></div>
        <p
          aria-label="Sets the visual and stylistic standards for the brand, ensuring consistency in logos, colours, fonts, and design."
        >
          Sets the visual and stylistic standards for the brand, ensuring
          consistency in logos, colours, fonts, and design.
        </p>
      </a>
      <!-- BRAND GUIDE END -->
      <!-- CREDIT GUIDE START -->
      <a
        class="gallery-item"
        href="https://slavic.media/press-resources/credit-guide.pdf"
        rel="noopener noreferrer nofollow"
        target="_blank"
        aria-label="Link to Credit Guide"
      >
        <h2
          style="font-size: var(--font-size-2)"
          id="creditGuideHeading"
          aria-label="Credit Guide Title"
        >
          Credit Guide
        </h2>

        <div class="grid-item" id="credit-guide" role="gridcell"></div>
        <p
          aria-label="Outlines how to tag and credit work across digital as well as printed media."
        >
          Outlines how to tag and credit work across digital as well as printed
          media.
        </p>
      </a>
      <!-- CREDIT GUIDE END -->
      <!-- PRESS KIT START -->
      <a
        class="gallery-item"
        href="https://slavic.media/press-resources/press-kit.zip"
        target="_blank"
        aria-label="Link to Press Kit"
      >
        <h2
          style="font-size: var(--font-size-2)"
          id="pressKitHeading"
          aria-label="Press Kit Title"
        >
          Press Kit
        </h2>

        <div class="grid-item" id="press-kit" role="gridcell"></div>
        <p
          aria-label="Package of vectorised logos, fonts and other essential branding materials."
        >
          Package of vectorised logos, fonts and other essential branding
          materials.
        </p>
      </a>
      <!-- PRESS KIT END -->
    </div>
    <hr class="semi" />
  </article>
</template>
<style lang="scss" scoped>
/* GALLERY PRESS START */
#gallery-press {
  display: grid;
  grid-gap: var(--grid-gap-3);
  grid-template-columns: repeat(3, 1fr);
  width: 100%;
}
#gallery-press .gallery-item p {
  font-size: var(--fontsize-p);
  padding: unset;
  opacity: 1;
  -webkit-transform: unset;
  -ms-transform: unset;
  transform: unset;
}
#gallery-press #brand-guide {
  background-image: url(https://slavic.media/img/cover-brandguide.png);
}
#gallery-press #credit-guide {
  background-image: url(https://slavic.media/img/cover-creditguide.png);
}
#gallery-press #press-kit {
  background-image: url(https://slavic.media/img/cover-presskit.jpg);
}
#gallery-press i:hover {
  color: rgb(var(--white-color));
}
#gallery-press .grid-item {
  height: var(--dimension-2);
}
#gallery-press .gallery-item {
  margin-bottom: var(--grid-gap-3);
}
#gallery-press .grid-item {
  -webkit-box-shadow: var(--box-shadow-1);
  box-shadow: var(--box-shadow-1);
  margin: var(--grid-gap-1) 0;
}
#gallery-press a:hover h2 {
  text-decoration: underline;
}
#gallery-press a:hover p {
  text-decoration: none !important;
  opacity: 100;
}
#gallery-press .grid-item {
  width: 100%;
  height: auto;
  aspect-ratio: 4/3;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-pack: center;
  -ms-flex-pack: center;
  justify-content: center;
  background-position: center center;
  background-repeat: no-repeat;
  background-size: cover;
  overflow: hidden;
  position: relative;
}

#gallery-press .gallery-item,
#gallery-press .gallery-item::after,
#gallery-press .gallery-item:hover,
#gallery-press .grid-item,
#gallery-press .grid-item::after,
#gallery-press .grid-item:hover {
  border-radius: var(--border-radius-1);
  -webkit-transition: var(--transition-1);
  -o-transition: var(--transition-1);
  transition: var(--transition-1);
}

#gallery-press .grid-item span p,
#gallery-press .grid-item span p i {
  color: rgb(var(--primary-color));
}
#gallery-press .grid-item:focus::after,
#gallery-press .grid-item:hover::after {
  -webkit-transform: scale(1.05);
  -ms-transform: scale(1.05);
  transform: scale(1.05);
}
#gallery-press .grid-item::after {
  background: inherit;
  background-size: cover;
  bottom: 0;
  content: "";
  left: 0;
  position: absolute;
  right: 0;
  top: 0;
  -webkit-transform-origin: center;
  -ms-transform-origin: center;
  transform-origin: center;
}

/* GALLERY PRESS END */
</style>
