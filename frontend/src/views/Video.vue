<script setup lang="ts">
import { onMounted, ref, nextTick } from "vue";
import $ from "jquery";
import eventBus, { EventBus } from "@/eventBus";
import requestAProposal from "@/components/request-a-proposal.vue";
import swiperReels from "@/components/swiper-reels.vue";
import galleryItem from "@/components/gallery-item.vue";
import services from "@/modules/services";
import skeletonServices from "@/components/skeleton-services.vue";
import video from "@/modules/video";
import { useRouter } from "vue-router";
import bannerLightroomPresets from "@/components/banner-lightroom-presets.vue";

const { state: serviceState, getSpecificService } = services();
const { state: videoState, getAllGalleries } = video();
const isDataLoaded = ref<boolean>(false);
const router = useRouter();

onMounted(async () => {
  await Promise.all([getSpecificService("video"), getAllGalleries()]);
  isDataLoaded.value = true;

  nextTick(() => {
    document.querySelectorAll<HTMLElement>(".gallery").forEach((gallery) => {
      $(gallery).magnificPopup({
        delegate: "a",
        type: "iframe",
        gallery: {
          enabled: "true",
          navigateByImgClick: "false",
          fixedContentPos: "false",
          overflowY: "scroll",
          preload: [0, 1],
        },
        zoom: {
          enabled: "true",
          duration: 300,
        },
      });
    });
  });
});

router.beforeEach((to, from, next) => {
  if ($.magnificPopup.instance.isOpen) {
    $.magnificPopup.close();
  }
  next();
});

const showRequestAProposal = (data: Gallery): void => {
  (eventBus as EventBus).emit("showRequestAProposal", data);
};
</script>

<template>
  <article class="main" style="margin-top: 120px">
    <section class="wrapper-wide">
      <!-- PAGE ABSTRACT START -->
      <div
        class="grid-container caption-container"
        v-if="isDataLoaded"
        aria-busy="false"
      >
        <div class="grid-item">
          <h1 class="reveal" aria-label="Video Services">
            <span class="gradient"> {{ serviceState.service?._id }} </span>
            Services
          </h1>
        </div>
        <div class="grid-item">
          <p class="reveal">
            {{ serviceState.service?.desc }}
          </p>
        </div>
      </div>
      <!-- PAGE ABSTRACT END -->

      <div v-if="isDataLoaded" aria-busy="false">
        <!-- GALLERY -->
        <div v-for="gallery in videoState.galleries" :key="gallery._id">
          <div :id="gallery._id"></div>
          <hr class="reveal" role="separator" />

          <div class="grid-container caption-container">
            <div class="grid-item reveal">
              <h2>
                {{ gallery.title.split(" ")[0] }}
                <span class="gradient">{{ gallery.title.split(" ")[1] }}</span>
              </h2>
            </div>
            <div class="grid-item">
              <p class="reveal">{{ gallery.desc }}</p>
              <requestAProposal />
              <button
                @click="showRequestAProposal(gallery)"
                class="popup-with-form reveal"
                id="request-a-proposal-button"
              >
                <div class="cta">
                  Request a Proposal<i class="pi pi-arrow-right"></i>
                </div>
              </button>
            </div>
            <br />
          </div>

          <!-- GALLERY ITEMS -->
          <div class="gallery" aria-label="Video Gallery">
            <galleryItem
              v-for="video in gallery.videos"
              :key="video._id"
              :flag="video.flag"
              :img="video._id"
              icon="video"
              :alt="`${video.title} cover`"
              :opacity="0.5"
              :url="`https://vimeo.com/slavicmedia/${video.url}`"
              :title="video.title"
              :desc="`${video.year} | ${video.client}`"
            />
          </div>
        </div>
        <hr class="reveal" role="separator" />

        <!-- SWIPER START -->
        <div class="grid-container caption-container">
          <div class="grid-item reveal">
            <h2 class="reveal" aria-label="Engaging Content">
              Engaging <span class="gradient">Content</span>
            </h2>
          </div>
          <div class="grid-item">
            <p class="reveal">
              Social media reels that capture your brand’s essence—engaging,
              genuine, and designed to resonate with your audience.
            </p>
            <requestAProposal />
            <button
              @click="showRequestAProposal(gallery)"
              class="popup-with-form reveal"
              id="request-a-proposal-button"
            >
              <div class="cta">
                Request a Proposal<i class="pi pi-arrow-right"></i>
              </div>
            </button>
          </div>
          <div id="content"></div>
        </div>
        <br />
        <swiperReels></swiperReels>
      </div>
      <!-- SWIPER END -->

      <!-- SKELETON START -->
      <div v-else aria-busy="true" aria-live="polite">
        <skeletonServices></skeletonServices>
      </div>
      <!-- SKELETON END -->
    </section>
    <!-- LIGHTROOM PRESETS CTA START -->
    <section v-if="isDataLoaded" aria-busy="false">
      <bannerLightroomPresets></bannerLightroomPresets>
    </section>
    <!-- LIGHTROOM PRESETS CTA END -->
  </article>
</template>

<style lang="scss" scoped>
@media only screen and (max-width: 375px) {
  .gallery-item {
    height: 120px;
  }
}
</style>
