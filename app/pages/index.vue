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
          <p class="home-subtitle">{{ t('home.subtitle') }}</p>
          <p class="home-bio">{{ t('home.bio') }}</p>
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

    <NuxtLink
      :to="localePath('/portfolio/kaizen')"
      class="kaizen-section hidden-element"
    >
      <img
        src="/images/kaizen/Banner.webp"
        alt="Kaizen"
        class="kaizen-image"
      />
      <div class="kaizen-content">
        <h2>Kaizen</h2>
        <p>{{ t('home.kaizen.description') }}</p>
      </div>
    </NuxtLink>
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
  align-self: center;
}

.max-image {
  height: 18rem;
  cursor: pointer;
}

.home-title {
  text-align: center;
}

.home-subtitle {
  color: var(--text-20);
  margin-top: 0.5rem;
  font-size: 1.125rem;
}

.home-bio {
  color: var(--text-30);
  margin-top: 0.75rem;
  font-size: 0.95rem;
  line-height: 1.6;
  max-width: 45ch;
}

.home-buttons {
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 1rem;
  margin-top: 1rem;
}

.kaizen-section {
  display: flex;
  flex-direction: column;
  max-width: 60ch;
  margin-top: 3rem;
  border-radius: 0.75rem;
  overflow: hidden;
  border: 1px solid var(--background-20);
  text-decoration: none;
  color: inherit;
  transition:
    border-color 0.2s,
    transform 0.2s;
}

.kaizen-section:hover {
  border-color: var(--primary);
  transform: translateY(-2px);
}

.kaizen-image {
  width: 100%;
  aspect-ratio: 16/9;
  object-fit: cover;
}

.kaizen-content {
  padding: 1.25rem;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;

  h2 {
    font-size: 1.333rem;
    color: var(--primary);
  }

  p {
    color: var(--text-20);
    font-size: 0.95rem;
    line-height: 1.5;
  }
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

  .home-subtitle {
    font-size: 1.25rem;
  }

  .home-buttons {
    justify-content: normal;
  }

  .kaizen-section {
    margin-top: 5rem;
  }
}
</style>
