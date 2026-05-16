<script setup lang="ts">
const route = useRoute();
</script>

<template>
  <header class="header">
    <div class="container header-inner">
      <NuxtLink to="/" class="brand label"> RSS <span class="accent">///</span> Físicos </NuxtLink>
      <nav class="nav">
        <NuxtLink to="/" class="nav-link label" :class="{ active: route.path === '/' }"
          >Feed</NuxtLink
        >
        <NuxtLink
          to="/sources"
          class="nav-link label"
          :class="{ active: route.path === '/sources' }"
          >Fuentes</NuxtLink
        >
        <NuxtLink to="/about" class="nav-link label" :class="{ active: route.path === '/about' }"
          >Acerca</NuxtLink
        >
      </nav>
    </div>
  </header>
</template>

<style scoped>
.header {
  position: sticky;
  top: 0;
  z-index: 10;
  border-bottom: 1px solid var(--color-border);
  backdrop-filter: blur(var(--blur));
  -webkit-backdrop-filter: blur(var(--blur));
  background: rgba(9, 9, 9, 0.7);
}

.header-inner {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 48px;
}

.brand {
  color: var(--color-text);
  letter-spacing: 0.1em;
}

.accent {
  color: var(--color-accent);
}

.nav {
  display: flex;
  gap: var(--spacing-2xl);
}

.nav-link {
  color: var(--color-text-muted);
  transition: color var(--duration-fast);
}

.nav-link:hover,
.nav-link.active {
  color: var(--color-text);
}

.nav-link.active {
  color: var(--color-accent);
}
</style>
