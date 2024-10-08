<script setup>
import { ref, onMounted } from "vue";
import useArticleCrud from "../modules/articleCrud";
import { useRoute } from "vue-router";

// Destructure methods and state from articleCrud
const { getSpecificArticleBySlug, state } = useArticleCrud();
const route = useRoute();

const isDataLoaded = ref(false);

onMounted(async () => {
  await getSpecificArticleBySlug(route.params.slug);
  console.log("Loaded article:", state.article); // Log the loaded article
  isDataLoaded.value = true;
});
</script>

<template>
  <article class="wrapper-standard">
    <hr class="semi" />

    <div v-if="isDataLoaded">
      <img :src="state.article.metadata.thumbnail" />
      <h1 style="font-size: var(--font-size-1)" class="mt-5 mb-5">
        {{ state.article.title }}
      </h1>
      <Card class="card" role="region">
        <template #content>
          <div class="flex items-center justify-between gap-2">
            <div class="flex items-center gap-2">
              <Avatar
                :image="state.article.author.thumbnail"
                size="large"
                shape="circle"
              />
              <div>
                <a
                  target="_blank"
                  rel="noopener noreferrer nofollow"
                  :href="state.article.author.url"
                  style="font-size: var(--font-size-8)"
                  class="font-bold"
                  >{{ state.article.author.name }}</a
                ><br />
                <span style="font-size: var(--font-size-8)">
                  {{ state.article.metadata.date }}&nbsp;⋅&nbsp;{{
                    state.article.metadata.lenght
                  }}
                  min read</span
                >
              </div>
            </div>
            <div class="flex items-center gap-3">
              <a
                target="_blank"
                rel="noopener noreferrer nofollow"
                :href="state.article.metadata.linkedin"
                class="pi pi-linkedin"
              ></a>
              <a
                target="_blank"
                rel="noopener noreferrer nofollow"
                :href="state.article.metadata.facebook"
                class="pi pi-facebook"
              ></a>
              <Button
                class="cta"
                type="button"
                label="Share"
                icon="pi pi-share-alt"
              />
            </div>
          </div>
        </template>
      </Card>

      <p class="mt-5 mb-5 reveal">{{ state.article.content.text[0] }}</p>
      <img :src="state.article.content.img[0]" />
      <p class="img-desc">
        Lorem ipsum, dolor sit amet consectetur adipisicing elit.
      </p>
      <p class="mt-5 mb-5 reveal">{{ state.article.content.text[1] }}</p>
      <p class="mt-5 mb-5 reveal">{{ state.article.content.text[2] }}</p>
      <img :src="state.article.content.img[1]" />
      <p class="img-desc">
        Lorem ipsum, dolor sit amet consectetur adipisicing elit.
      </p>
      <p class="mt-5 mb-5 reveal">{{ state.article.content.text[3] }}</p>
      <p class="mt-5 mb-5 reveal">{{ state.article.content.text[4] }}</p>
      <p class="mt-5 mb-5 reveal">{{ state.article.content.text[5] }}</p>
    </div>
    <div
      v-else
      class="rounded-lg border border-surface-200 dark:border-surface-700 bg-surface-0 dark:bg-surface-800 shadow-lg mb-4 p-8"
    >
      <div class="flex mb-4">
        <Skeleton shape="circle" size="4rem" class="mr-2"></Skeleton>
        <div>
          <Skeleton width="10rem" class="mb-2"></Skeleton>
          <Skeleton width="5rem" class="mb-2"></Skeleton>
          <Skeleton height=".5rem"></Skeleton>
        </div>
      </div>
      <Skeleton width="100%" height="150px"></Skeleton>
      <div class="flex justify-between mt-4">
        <Skeleton width="4rem" height="2rem"></Skeleton>
        <Skeleton width="4rem" height="2rem"></Skeleton>
      </div>
    </div>
    <hr class="semi" />
  </article>
</template>

<style lang="scss" scoped>
p.img-desc {
  font-size: var(--font-size-8);
  text-align: center;
  margin: var(--grid-gap-1) 0;
}
</style>
