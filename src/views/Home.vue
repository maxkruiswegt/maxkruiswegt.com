<script setup>
import { useI18n } from 'vue-i18n';
import confetti from 'canvas-confetti';

const { t, locale } = useI18n();

function switchImage(event, newSrc) {
  event.target.src = newSrc;
}

function triggerConfetti() {
  confetti({
    particleCount: 100,
    spread: 70,
    origin: { y: 0.6 },
  });
}
</script>

<template>
  <div class="home-page">
    <img
      src="/images/Max.webp"
      alt="Max Kruiswegt"
      class="max-image hidden-element"
      draggable="false"
      @mouseover="switchImage($event, '/images/Max_Cool.webp')"
      @mouseout="switchImage($event, '/images/Max.webp')"
      @click="triggerConfetti"
    />
    <div class="hidden-element">
      <div class="home-title">
        <h1 v-html="t('home.title')"></h1>
      </div>
      <div class="home-buttons">
        <RouterLink
          :to="{ name: `portfolio_${locale}` }"
          class="btn btn-primary"
          v-html="t('home.buttonWork')"
        >
        </RouterLink>
        <RouterLink
          :to="{ name: `contact_${locale}` }"
          class="btn btn-secondary"
          v-html="t('home.buttonContact')"
        >
        </RouterLink>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* Extra Small Devices (Less than 576px) */
.home-page {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2rem;
  margin-top: 5vh;
  margin-bottom: 10vh;
}

.max-image {
  height: 18rem;
  cursor: pointer;
}

.home-title {
  text-align: center;
}

.home-buttons {
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 1rem;
  margin-top: 1rem;
}

.home-page:nth-child(1) {
  transition-delay: 0.2s;
}

.home-page:nth-child(2) {
  transition-delay: 0.4s;
}

/* Small Devices */
@media screen and (min-width: 576px) {
  .home-buttons {
    flex-direction: row;
  }
}

/* Medium Devices */
@media screen and (min-width: 768px) {
}

/* Large Devices*/
@media screen and (min-width: 992px) {
  .home-page {
    flex-direction: row;
    gap: 5rem;
    margin-top: 12.5vh;
    margin-bottom: 20vh;
  }

  .max-image {
    height: 24rem;
  }

  .home-title {
    text-align: left;
  }

  .home-buttons {
    justify-content: normal;
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
