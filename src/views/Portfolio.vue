<script setup>
import Project from '@/components/ProjectPreview.vue';
import { useI18n } from 'vue-i18n';

const { t, tm } = useI18n();
</script>

<template>
  <div class="portfolio">
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
/* Default styles: Mobile first */
.portfolio {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;

  h1,
  p {
    text-align: center;
  }
}

.portfolio-projects {
  display: grid;
  grid-template-columns: repeat(1, minmax(0, 1fr));
  gap: 1rem;
  margin-top: 2rem;
  width: 100%;
}

/* Smaller phone viewpoints (380px and up) */
@media screen and (min-width: 380px) {
}

/* Small devices and most phones (480px and up) */
@media only screen and (min-width: 480px) {
}

/* Most tablets (768px and up) */
@media only screen and (min-width: 768px) {
  .portfolio-projects {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}

/* Smaller desktop viewpoints (992px and up) */
@media only screen and (min-width: 992px) {
}

/* Large devices and wide screens (1200px and up) */
@media only screen and (min-width: 1200px) {
  .portfolio-projects {
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }
}
</style>
