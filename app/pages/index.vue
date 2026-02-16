<script setup lang="ts">
const { t } = useI18n();
const localePath = useLocalePath();

useSeoMeta({
  description: () => t('footer.description'),
  ogDescription: () => t('footer.description'),
});

function switchImage(event: Event, newSrc: string) {
  (event.target as HTMLImageElement).src = newSrc;
}

async function triggerConfetti() {
  if (import.meta.client) {
    const { default: confetti } = await import('canvas-confetti');
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 },
    });
  }
}
</script>

<template>
  <div class="home-container">
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
          <NuxtLink
            :to="localePath('/portfolio')"
            class="btn btn-primary"
          >
            {{ t('home.buttonWork') }}
          </NuxtLink>
          <NuxtLink
            :to="localePath('/contact')"
            class="btn btn-secondary"
          >
            {{ t('home.buttonContact') }}
          </NuxtLink>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* Extra Small Devices (Less than 576px) */
.home-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
}

.home-page {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2rem;
  margin-top: 5vh;
  margin-bottom: 5vh;
  align-self: center;
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

/* Large Devices*/
@media screen and (min-width: 992px) {
  .home-page {
    flex-direction: row;
    margin-top: 12.5vh;
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
</style>
