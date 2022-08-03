<template>
  <AppHeader class="z-999 h-18" />
  <main class="relative z-998 flex flex-col justify-center min-h-screen pt-18">
    <router-view />
    <AppFooter />
  </main>
  <div class="bg-hero-topography bg-gray-400/10 absolute inset-0 z-0"></div>
</template>
