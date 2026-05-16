<script setup lang="ts">
interface Source {
  id: number;
  name: string;
  category: string | null;
}

const props = defineProps<{ sources: Source[] }>();
const emit = defineEmits<{ (e: "change", ids: number[]): void }>();

const { isVisible, toggle, visibleIds } = useSourcePrefs();

function handleToggle(id: number) {
  toggle(id);
  emit("change", visibleIds(props.sources.map((s) => s.id)));
}

onMounted(() => {
  emit("change", visibleIds(props.sources.map((s) => s.id)));
});
</script>

<template>
  <div class="filter-bar">
    <button
      v-for="source in sources"
      :key="source.id"
      class="chip label"
      :class="{ active: isVisible(source.id) }"
      @click="handleToggle(source.id)"
    >
      {{ source.name }}
    </button>
  </div>
</template>

<style scoped>
.filter-bar {
  display: flex;
  flex-wrap: wrap;
  gap: var(--spacing-sm);
  padding-block: var(--spacing-xl);
}

.chip {
  padding: var(--spacing-xs) var(--spacing-lg);
  border: 1px solid var(--color-border);
  border-radius: var(--radius);
  background: transparent;
  color: var(--color-text-muted);
  cursor: pointer;
  transition:
    color var(--duration-fast),
    border-color var(--duration-fast),
    background var(--duration-fast);
}

.chip:hover {
  color: var(--color-text);
  border-color: rgba(255, 255, 255, 0.3);
}

.chip.active {
  color: var(--color-text);
  border-color: var(--color-accent);
  background: rgba(255, 11, 11, 0.08);
}
</style>
