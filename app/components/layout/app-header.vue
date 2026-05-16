<script setup lang="ts">
const route = useRoute();
const colorMode = useColorMode();

function toggleTheme() {
  colorMode.preference = colorMode.value === "dark" ? "light" : "dark";
}
</script>

<template>
  <header class="header">
    <div class="container header-inner">
      <NuxtLink to="/" class="brand label">
        RSS <span class="separator">para</span> Físicos
      </NuxtLink>
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
        <button
          class="theme-toggle"
          :aria-label="`Cambiar a modo ${colorMode.value === 'dark' ? 'claro' : 'oscuro'}`"
          @click="toggleTheme"
        >
          <Icon v-if="colorMode.value === 'dark'" name="solar:sun-linear" size="16" />
          <Icon v-else name="solar:moon-linear" size="16" />
        </button>
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
  background: var(--color-header-bg);
  transition:
    background var(--duration-base),
    border-color var(--duration-base);
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
  transition: opacity var(--duration-fast) var(--ease-out);
}

.separator {
  color: var(--color-text-muted);
  margin-inline: 2px;
}

@media (hover: hover) and (pointer: fine) {
  .brand:hover {
    opacity: 0.6;
  }
}

.brand:active {
  opacity: 0.4;
}

.nav {
  display: flex;
  align-items: center;
  gap: var(--spacing-2xl);
}

.nav-link {
  color: var(--color-text-muted);
  padding-bottom: 2px;
  text-decoration: underline;
  text-decoration-color: transparent;
  text-underline-offset: 3px;
  text-decoration-thickness: 1px;
  transition:
    color var(--duration-fast) var(--ease-out),
    text-decoration-color var(--duration-fast) var(--ease-out);
}

.nav-link.active {
  color: var(--color-text);
  text-decoration-color: currentColor;
}

@media (hover: hover) and (pointer: fine) {
  .nav-link:hover {
    color: var(--color-text);
  }
}

.theme-toggle {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 28px;
  height: 28px;
  border: 1px solid var(--color-border);
  border-radius: var(--radius);
  background: transparent;
  color: var(--color-text-muted);
  cursor: pointer;
  transition:
    color var(--duration-fast) var(--ease-out),
    border-color var(--duration-fast) var(--ease-out),
    transform var(--duration-fast) var(--ease-out);
  margin-left: calc(var(--spacing-xl) - var(--spacing-2xl));
}

@media (hover: hover) and (pointer: fine) {
  .theme-toggle:hover {
    color: var(--color-text);
    border-color: var(--color-accent);
  }
}

.theme-toggle:active {
  transform: scale(0.91);
}
</style>
