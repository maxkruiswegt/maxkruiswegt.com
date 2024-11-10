<script setup>
import { RouterView } from 'vue-router';
import AppNavbar from './components/AppNavbar.vue';
import AppFooter from './components/AppFooter.vue';
</script>

<template>
  <div class="main-app">
    <header>
      <AppNavbar />
    </header>
    <main class="main-content">
      <RouterView class="main-router" />
    </main>
    <footer>
      <AppFooter />
    </footer>
  </div>
</template>

<style scoped>
/* Extra Small Devices (Less than 576px) */
.main-app {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

.main-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 1rem;
  margin: 2.5rem 0;
}

.main-router {
  max-width: 1280px;
}

header {
  animation: fade-down 1s;
}

footer {
  animation: fade-up 1s;
}

/* Small Devices */
@media screen and (min-width: 576px) {
}

/* Medium Devices */
@media screen and (min-width: 768px) {
}

/* Large Devices*/
@media screen and (min-width: 992px) {
  .main-router {
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
