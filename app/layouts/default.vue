<template>
  <div>
    <ClientOnly>
      <LayoutWebGLBackground />
    </ClientOnly>
    <LayoutAppHeader />
    <main>
      <slot />
    </main>
  </div>
</template>
