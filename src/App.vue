<script setup>
import { onMounted } from 'vue';
import { RouterView } from 'vue-router';
import AppNavbar from './components/AppNavbar.vue';
import AppFooter from './components/AppFooter.vue';
import { observeElements } from '@/utils/observerUtils';

onMounted(() => {
  // Observe elements for animations
  observeElements();
});
</script>

<template>
  <div class="app-wrapper background-pattern-2">
    <div class="main-app">
      <header class="background-pattern-1">
        <AppNavbar />
      </header>
      <main class="main-content">
        <RouterView />
      </main>
      <footer class="background-pattern-1">
        <AppFooter />
      </footer>
    </div>
  </div>
</template>

<style scoped>
/* Extra Small Devices (Less than 576px) */
.app-wrapper {
  height: 100vh;
  width: 100%;
  overflow-x: hidden;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.main-content,
header,
footer {
  max-width: 1280px;
}

.main-content {
  display: flex;
  flex-direction: column;
  padding: 3.5rem 1rem;
}

header {
  animation: fade-down 1s;
  padding: 1rem;
  background-color: var(--background);
  border-radius: 0 0 0.5rem 0.5rem;

  /* Border thats on the left bottom and right */
  border-bottom: 1px solid var(--background-10);
  border-left: 1px solid var(--background-10);
  border-right: 1px solid var(--background-10);
}

footer {
  animation: fade-up 1s;
  padding: 1rem;
  background-color: var(--background);
  border-radius: 0.5rem 0.5rem 0 0;

  /* Border thats on the left top and right */
  border-top: 1px solid var(--background-10);
  border-left: 1px solid var(--background-10);
  border-right: 1px solid var(--background-10);
}

/* Small Devices */
@media screen and (min-width: 576px) {
}

/* Medium Devices */
@media screen and (min-width: 768px) {
}

/* Large Devices*/
@media screen and (min-width: 992px) {
  .main-content {
    padding: 4.5rem 2rem;
  }

  header {
    padding: 2rem;
  }

  footer {
    padding: 2rem;
  }
}

/* Extra Large Devices */
@media screen and (min-width: 1200px) {
}

/* Extra Extra Large Devices */
@media screen and (min-width: 1600px) {
}

/* Very Large Devices */
@media screen and (min-width: 2560px) {
}
</style>
