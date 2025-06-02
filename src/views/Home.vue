<script setup>
import { computed } from 'vue';
import { useI18n } from 'vue-i18n';
import confetti from 'canvas-confetti';

const { t, locale } = useI18n();

const mkDevelopmentUrl = computed(() => {
  return locale.value === 'nl' ? 'https://mkdevelopment.nl' : 'https://mkdevelopment.nl/en';
});

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

    <!-- Business Section -->
    <div class="business-section hidden-element">
      <div class="business-content">
        <h2 v-html="t('home.business.title')"></h2>
        <p v-html="t('home.business.description')"></p>
        <a
          :href="mkDevelopmentUrl"
          target="_blank"
          rel="noopener noreferrer"
          class="btn btn-primary"
          v-html="t('home.business.button')"
        ></a>
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

.business-section {
  display: flex;
  max-width: 60ch;
  padding: 1.5rem;
  margin-top: 2rem;
  background: var(--background);
  border-radius: 1rem;
  border: 2px solid var(--text-10);
  text-align: center;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2);

  .business-content {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1rem;

    h2 {
      color: var(--primary);
      font-size: 1.5rem;
      line-height: 1.3;
      word-wrap: break-word;
    }

    p {
      color: var(--text-20);
      line-height: 1.6;
      font-size: 0.95rem;
    }

    .btn {
      width: 100%;
      box-sizing: border-box;
    }
  }
}

/* Small Devices */
@media screen and (min-width: 576px) {
  .home-buttons {
    flex-direction: row;
  }
}

/* Medium Devices */
@media screen and (min-width: 768px) {
  .business-section {
    padding: 2rem;
    margin-top: 5rem;

    .business-content {
      h2 {
        font-size: 1.75rem;
      }

      p {
        font-size: 1rem;
      }
    }
  }
}

/* Large Devices*/
@media screen and (min-width: 992px) {
  .home-page {
    flex-direction: row;
    gap: 5rem;
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

  .business-section {
    .business-content {
      h2 {
        font-size: 2rem;
      }
    }
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
