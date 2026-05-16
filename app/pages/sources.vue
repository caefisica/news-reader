<script setup lang="ts">
interface Source {
  id: number;
  name: string;
  category: string | null;
  last_fetched_at: number | null;
  article_count: number;
}

const { data } = await useAsyncData("sources-page", () =>
  $fetch<{ sources: Source[] }>("/api/sources"),
);

const sources = computed(() => data.value?.sources ?? []);
const { isVisible, toggle } = useSourcePrefs();

function formatDate(ts: number | null): string {
  if (!ts) return "nunca";
  return new Intl.DateTimeFormat("es-PE", {
    day: "numeric",
    month: "short",
    hour: "2-digit",
    minute: "2-digit",
  }).format(new Date(ts * 1000));
}
</script>

<template>
  <div class="container sources-page">
    <header class="page-header">
      <h1 class="page-title">Fuentes</h1>
      <p class="page-subtitle">
        Activa o desactiva las fuentes que aparecen en tu feed. La preferencia se guarda localmente.
      </p>
    </header>

    <div class="sources-grid">
      <div v-for="source in sources" :key="source.id" class="card-shell">
        <div class="card source-card">
          <div class="source-info">
            <span class="source-name">{{ source.name }}</span>
            <span v-if="source.category" class="label category-badge">{{ source.category }}</span>
          </div>
          <div class="source-meta label">
            {{ source.article_count }} artículos · actualizado
            {{ formatDate(source.last_fetched_at) }}
          </div>
          <button
            class="toggle label"
            :class="{ on: isVisible(source.id) }"
            @click="toggle(source.id)"
            :aria-label="`${isVisible(source.id) ? 'Ocultar' : 'Mostrar'} ${source.name}`"
          >
            {{ isVisible(source.id) ? "Visible" : "Oculto" }}
          </button>
        </div>
      </div>
    </div>

    <footer class="suggest-footer">
      <a
        href="https://github.com/caefisica/rss-reader/issues/new?template=suggest-source.md"
        target="_blank"
        rel="noopener noreferrer"
        class="suggest-link label"
      >
        + Sugerir una fuente
      </a>
    </footer>
  </div>
</template>

<style scoped>
.sources-page {
  padding-block: var(--spacing-2xl);
}

.page-header {
  margin-bottom: var(--spacing-2xl);
}

.page-title {
  font-size: 24px;
  font-weight: 300;
  letter-spacing: -0.02em;
  margin-bottom: var(--spacing-sm);
}

.page-subtitle {
  color: var(--color-text-muted);
  font-size: 13px;
}

.sources-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: var(--spacing-sm);
}

.source-card {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-sm);
  padding: var(--spacing-lg) var(--spacing-xl);
}

.source-info {
  display: flex;
  align-items: center;
  gap: var(--spacing-md);
}

.source-name {
  font-size: 14px;
  font-weight: 400;
}

.category-badge {
  color: var(--color-gold);
  border: 1px solid rgba(255, 185, 21, 0.3);
  padding: 2px var(--spacing-xs);
  border-radius: var(--radius);
}

.source-meta {
  color: var(--color-text-muted);
}

.toggle {
  align-self: flex-start;
  padding: var(--spacing-xs) var(--spacing-lg);
  border: 1px solid var(--color-border);
  border-radius: var(--radius);
  background: transparent;
  color: var(--color-text-muted);
  cursor: pointer;
  transition: all var(--duration-fast);
}

.toggle.on {
  color: var(--color-accent);
  border-color: var(--color-accent);
  background: rgba(255, 11, 11, 0.08);
}

.suggest-footer {
  margin-top: var(--spacing-3xl);
  text-align: center;
}

.suggest-link {
  color: var(--color-text-muted);
  border-bottom: 1px solid var(--color-border);
  padding-bottom: 2px;
  transition: color var(--duration-fast);
}

.suggest-link:hover {
  color: var(--color-text);
}
</style>
