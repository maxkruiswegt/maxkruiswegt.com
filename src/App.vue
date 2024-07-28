<script setup>
import { RouterView } from 'vue-router'
import AppNavbar from './components/AppNavbar.vue'
import AppFooter from './components/AppFooter.vue'
</script>

<template>
  <div class="flex flex-col min-h-screen">
    <header>
      <AppNavbar />
    </header>
    <main class="flex flex-col items-center">
      <RouterView class="max-w-screen-xl p-4 lg:p-8 my-10" />
    </main>
    <footer class="mt-auto">
      <AppFooter />
    </footer>
  </div>
</template>

<style scoped>
header {
  animation: fade-down 1s;
}

footer {
  animation: fade-up 1s;
}
</style>