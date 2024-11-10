<script setup>
import Project from '@/components/ProjectPreview.vue';
import { onMounted } from 'vue';
import { useI18n } from 'vue-i18n';

const { t, tm, locale } = useI18n();

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
</script>

<template>
  <div>
    <h1 class="hidden-element">{{ t('portfolio.title') }}</h1>
    <p class="hidden-element">{{ t('portfolio.description') }}</p>
    <div class="portfolio-projects">
      <Project
        v-for="(project, key, index) in tm('portfolio.projects')"
        :key="key"
        :id="key"
        :title="project.title"
        :description="project.description"
        :image="project.images[0]"
        :style="{ 'transition-delay': `${index * 0.2}s` }"
        class="hidden-element"
      />
    </div>
  </div>
</template>

<style scoped>
/* Extra Small Devices (Less than 576px) */
.portfolio-projects {
  display: grid;
  grid-template-columns: repeat(1, minmax(0, 1fr));
  gap: 1rem;
  margin-top: 2rem;
}

/* Small Devices */
@media screen and (min-width: 576px) {
}

/* Medium Devices */
@media screen and (min-width: 768px) {
  .portfolio-projects {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}

/* Large Devices*/
@media screen and (min-width: 992px) {
  .portfolio-projects {
    grid-template-columns: repeat(3, minmax(0, 1fr));
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
