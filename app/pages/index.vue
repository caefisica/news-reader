<script setup lang="ts">
interface Source {
  id: number;
  name: string;
  category: string | null;
}

interface Article {
  id: number;
  title: string;
  link: string;
  description: string | null;
  author: string | null;
  published_at: number | null;
  source_name: string;
  category: string | null;
}

const { data } = await useAsyncData("feed-init", () =>
  Promise.all([
    $fetch<{ sources: Source[] }>("/api/sources"),
    $fetch<{ articles: Article[] }>("/api/articles?page=1"),
  ]),
);

const sources = computed(() => data.value?.[0].sources ?? []);
const initialArticles = computed(() => data.value?.[1].articles ?? []);

const activeSourceIds = ref<number[]>(sources.value.map((s) => s.id));

function onFilterChange(ids: number[]) {
  activeSourceIds.value = ids;
}
</script>

<template>
  <div class="container feed-page">
    <SourceFilter v-if="sources.length > 0" :sources="sources" @change="onFilterChange" />
    <ArticleFeed :initial-articles="initialArticles" :active-source-ids="activeSourceIds" />
  </div>
</template>

<style scoped>
.feed-page {
  padding-block: var(--spacing-2xl);
}
</style>
