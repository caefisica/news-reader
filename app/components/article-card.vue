<script setup lang="ts">
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

const props = defineProps<{ article: Article }>();

function formatDate(ts: number | null): string {
  if (!ts) return "";
  return new Intl.DateTimeFormat("es-PE", {
    day: "numeric",
    month: "short",
    year: "numeric",
  }).format(new Date(ts * 1000));
}
</script>

<template>
  <div class="card-shell">
    <article class="card article-card">
      <header class="article-meta">
        <span class="label source-tag">{{ article.source_name }}</span>
        <span class="label date-tag" v-if="article.published_at">
          {{ formatDate(article.published_at) }}
        </span>
      </header>
      <a :href="article.link" target="_blank" rel="noopener noreferrer" class="article-title">
        {{ article.title }}
      </a>
      <p v-if="article.description" class="article-excerpt">
        {{ article.description }}
      </p>
      <footer v-if="article.author" class="article-author label">
        {{ article.author }}
      </footer>
    </article>
  </div>
</template>

<style scoped>
.article-card {
  padding: var(--spacing-lg) var(--spacing-2xl);
  display: flex;
  flex-direction: column;
  gap: var(--spacing-sm);
}

.article-meta {
  display: flex;
  align-items: center;
  gap: var(--spacing-xl);
}

.source-tag {
  color: var(--color-accent);
}

.date-tag {
  color: var(--color-text-muted);
}

.article-title {
  font-size: 15px;
  font-weight: 400;
  line-height: 22px;
  color: var(--color-text);
  transition: color var(--duration-fast);
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.article-title:hover {
  color: var(--color-text-secondary);
}

.article-excerpt {
  color: var(--color-text-muted);
  font-size: 13px;
  line-height: 18px;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.article-author {
  color: var(--color-text-muted);
}
</style>
