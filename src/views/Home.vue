<script setup>
import { onMounted } from 'vue';
import { useI18n } from 'vue-i18n';
import confetti from 'canvas-confetti';

const { t, locale } = useI18n();

onMounted(() => {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      handleIntersection(entry, observer);
    });
  });

  const hiddenElements = document.querySelectorAll('.hidden-element');
  hiddenElements.forEach((element) => {
    observer.observe(element);
  });

  function handleIntersection(entry, observer) {
    if (entry.isIntersecting) {
      entry.target.classList.add('show-element');
      entry.target.classList.remove('hidden-element');
      observer.unobserve(entry.target);
    }
  }
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
  <div class="mt-[10vh] mb-[20vh] lg:mt-[25vh] lg:mb-[35vh]">
    <div class="flex flex-col items-center lg:flex-row gap-8 lg:gap-20 main">
      <div class="hidden-element">
        <img
          src="/images/Max.webp"
          alt="Max Kruiswegt"
          class="h-72 lg:h-96 cursor-pointer"
          @mouseover="switchImage($event, '/images/Max_Cool.webp')"
          @mouseout="switchImage($event, '/images/Max.webp')"
          @click="triggerConfetti"
        />
      </div>
      <div class="hidden-element">
        <div class="text-center lg:text-left">
          <h1 v-html="t('home.title')"></h1>
        </div>
        <div
          class="flex flex-col sm:flex-row justify-center lg:justify-normal gap-4 mt-4"
        >
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
  </div>
</template>

<style scoped>
.main:nth-child(1) {
  transition-delay: 0.2s;
}

.main:nth-child(2) {
  transition-delay: 0.4s;
}
</style>
