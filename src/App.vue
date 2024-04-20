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
    <main>
      <RouterView />
    </main>
    <footer class="mt-auto">
      <AppFooter />
    </footer>
  </div>
</template>