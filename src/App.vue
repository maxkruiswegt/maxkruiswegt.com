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
  <div class="app-wrapper">
    <div class="main-app">
      <header>
        <AppNavbar />
      </header>
      <main class="main-content">
        <RouterView />
      </main>
      <footer>
        <AppFooter />
      </footer>
    </div>
  </div>
</template>

<style scoped>
/* Extra Small Devices (Less than 576px) */
.app-wrapper {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.main-app {
  display: flex;
  flex-direction: column;
  max-width: 1280px;
}

.main-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 1rem;
  margin: 2.5rem 0;
}

header {
  animation: fade-down 1s;
  padding: 1rem;
}

footer {
  animation: fade-up 1s;
  padding: 1rem;
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
    padding: 2rem;
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
