<script setup lang="ts">
import { ref, onMounted, watch } from "vue";
import { ddmmmyyyy } from "@/functions/date-format.ts";
import legal from "@/modules/legal";
import { useRoute } from "vue-router";

const { getSpecificLegal, getAllLegal, state } = legal();
const route = useRoute();
const isDataLoaded = ref<boolean>(false);

const fetchLegalData = async (id: string) => {
  isDataLoaded.value = false;
  await getSpecificLegal(id);
  await getAllLegal();
  isDataLoaded.value = true;
};

onMounted(async () => {
  await fetchLegalData(route.params.id as string);
});

watch(
  () => route.params.id,
  async (newId) => {
    await fetchLegalData(newId as string);
  }
);

interface LegalArticle {
  title: string;
  date: Date;
  content: string[];
}
interface State {
  legal: LegalArticle | null;
}
</script>

<template>
  <article class="main">
    <section class="cover">
      <div class="filter"></div>
      <img
        src="https://cdn.slavic.media/images/2024-07-16-00339/fit=contain,width=1280,sharpen=100"
        :alt="`${state.legal?.title} cover image`"
      />
      <div v-if="isDataLoaded" class="title reveal">
        <h1 class="reveal" role="heading" aria-level="1">
          {{ state.legal?.title }}
        </h1>
        <div>
          <span style="font-size: var(--font-size-7)" class="pi pi-replay"
            >&nbsp;</span
          >
          <span style="font-size: var(--font-size-7)">
            {{ state.legal?.date ? ddmmmyyyy(state.legal.date) : "" }}
          </span>
        </div>
      </div>
    </section>
    <hr class="semi" role="separator" />
    <further-legal
      v-if="isDataLoaded"
      :legals="state.legals"
      :current-id="route.params.id"
    ></further-legal>
    <section class="wrapper-standard">
      <div v-if="isDataLoaded" aria-busy="false">
        <hr class="reveal" role="separator" />
        <div class="article-content legal">
          <section
            v-for="(content, index) in state.legal?.content"
            :key="index"
            v-html="content"
          ></section>
        </div>
      </div>
      <div v-else>
        <skeletonArticle aria-busy="true" aria-live="polite"></skeletonArticle>
      </div>
    </section>
    <!-- LIGHTROOM PRESETS CTA START -->
    <section v-if="isDataLoaded" aria-busy="false">
      <bannerLightroomPresets></bannerLightroomPresets>
    </section>
    <!-- LIGHTROOM PRESETS CTA END -->
  </article>
</template>

<style lang="scss" scoped>
.cover,
.filter {
  height: var(--dimension-1);
  width: 100vw;
}
.filter {
  position: absolute;
  background-color: rgba(0, 0, 0, 0.3);
  z-index: 1;
}
.cover {
  height: var(--dimension-1);
  -webkit-box-pack: center;
  -ms-flex-pack: center;
  justify-content: center;
  width: 100vw;
  -o-object-fit: cover;
  object-fit: cover;
  position: relative;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
  overflow: hidden;
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
}
img {
  width: 100vw;
  object-fit: cover;
  object-position: top;
}
.title {
  position: absolute;
  z-index: 2;
  text-align: center;
}
.grid-container {
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-pack: justify;
  -ms-flex-pack: justify;
  justify-content: space-between;
}
.grid-container .grid-item:nth-child(odd) {
  margin-right: var(--grid-gap-2);
}
@media only screen and (max-width: 400px) {
  .cover,
  .filter {
    height: 400px;
  }
}
</style>
