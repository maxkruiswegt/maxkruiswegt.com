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

    <div class="featured-section hidden-element">
      <div class="featured-header">
        <p class="featured-label">{{ t('home.featured.label') }}</p>
        <h2>{{ t('home.featured.title') }}</h2>
        <p class="featured-description">{{ t('home.featured.description') }}</p>
      </div>
      <div class="featured-grid">
        <ProjectPreview
          id="kaizen"
          title="Kaizen"
          :description="t('home.kaizen.description')"
          image="/images/kaizen/Banner.webp"
        />
        <ProjectPreview
          id="mkdevelopment"
          title="MK Development"
          :description="t('home.mkdevelopment.description')"
          image="/images/mkdevelopment/Banner.webp"
        />
      </div>
      <NuxtLink
        :to="localePath('/portfolio')"
        class="featured-cta"
      >
        {{ t('home.featured.viewAll') }}
        <span class="material-symbols-outlined">arrow_forward</span>
      </NuxtLink>
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

.featured-section {
  display: flex;
  flex-direction: column;
  margin-top: 5vh;
  width: 100%;
}

.featured-header {
  margin-bottom: 1.5rem;
  text-align: center;
}

.featured-label {
  color: var(--primary);
  font-size: 0.875rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  margin-bottom: 0.5rem;
}

.featured-description {
  color: var(--text-20);
  margin-top: 0.5rem;
}

.featured-grid {
  display: grid;
  gap: 1.5rem;
}

.featured-cta {
  display: inline-flex;
  align-items: center;
  gap: 0.25rem;
  margin-top: 1.5rem;
  margin-left: auto;
  color: var(--primary);
  font-weight: 500;
  text-decoration: none;
  transition: color 150ms ease;
}

.featured-cta:hover {
  color: var(--primary-shade-20);
}

/* Small Devices */
@media screen and (min-width: 576px) {
  .home-buttons {
    flex-direction: row;
  }
}

/* Medium Devices */
@media screen and (min-width: 768px) {
  .featured-grid {
    grid-template-columns: repeat(2, 1fr);
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

  .featured-section {
    margin-top: 12.5vh;
  }
}
</style>
