<script setup lang="ts">
import { ref, onMounted } from "vue";
import article from "@/modules/article";
import blogCard from "@/components/blog-card.vue";
import skeletonGalleryItem from "@/components/skeleton-gallery-item.vue";

interface Author {
  _id: string;
  name: string;
  linkedin: string;
  thumbnail: string;
}

interface Article {
  _id: string;
  title: string;
  author: Author;
  metadata: {
    date: string;
  };
  content: string[];
}

interface State {
  articles: Article[];
}

const { state, getAllArticles } = article();
const isDataLoaded = ref<boolean>(false);

// SHOW MORE START
const ARTICLES_INCREMENT = 6;
const articlesToShow = ref(ARTICLES_INCREMENT);
const loadMoreArticles = () => {
  articlesToShow.value += ARTICLES_INCREMENT;
};
// SHOW MORE END

onMounted(async () => {
  await getAllArticles();
  isDataLoaded.value = true;
});
</script>

<template>
  <article class="main" style="margin-top: 120px">
    <section class="wrapper-wide">
      <h1 class="reveal">
        The <span class="gradient">Slavic Media</span> Blog
      </h1>
      <hr class="quater reveal" />

      <div v-if="isDataLoaded" aria-busy="false">
        <div class="grid-container">
          <div
            v-for="article in state.articles.slice(0, articlesToShow)"
            :key="article._id"
            role="region"
          >
            <blogCard :article="article"></blogCard>
          </div>
        </div>
        <br />
        <div class="flex-center">
          <button
            v-if="articlesToShow < state.articles.length"
            @click="loadMoreArticles"
            class="cta reveal"
          >
            Show More<i class="pi pi-arrow-right"></i>
          </button>
        </div>
      </div>
      <div v-else class="grid-container" aria-busy="true" aria-live="polite">
        <div v-for="n in 6" :key="n">
          <skeletonGalleryItem></skeletonGalleryItem>
        </div>
      </div>
    </section>
  </article>
</template>

<style lang="scss" scoped>
.grid-container {
  grid-template-columns: repeat(1, 1fr);
  display: grid;
  grid-gap: var(--grid-gap-3);
  height: auto;
  border-radius: var(--border-radius-1);
  color: white;
}

h1 {
  font-size: var(--font-size-2);
}

@media only screen and (min-width: 500px) {
  .grid-container {
    grid-template-columns: repeat(2, 1fr);
  }
}
@media only screen and (min-width: 700px) {
  .grid-container {
    grid-template-columns: repeat(3, 1fr);
  }
}
</style>
