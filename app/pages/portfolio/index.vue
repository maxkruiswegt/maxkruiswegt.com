<script setup lang="ts">
const { t, locale } = useI18n();

useHead({ title: t('portfolio.title') });

const collectionName = computed(() => `projects_${locale.value}` as 'projects_en' | 'projects_nl');

const { data: projects } = await useAsyncData(
  `projects-${locale.value}`,
  () => queryCollection(collectionName.value).select('path', 'stem', 'title', 'description', 'images').all(),
  { watch: [locale] }
);
</script>

<template>
  <div class="portfolio">
    <div class="portfolio-header hidden-element">
      <p class="project-count">{{ projects?.length }} {{ t('portfolio.projectLabel') }}</p>
      <h1>{{ t('portfolio.title') }}</h1>
      <p class="portfolio-description">{{ t('portfolio.description') }}</p>
    </div>
    <div class="portfolio-grid">
      <ProjectPreview
        v-for="project in projects"
        :key="project.path"
        :id="project.stem.split('/').at(-1) ?? project.stem"
        :title="project.title"
        :description="project.description"
        :image="project.images[0] ?? ''"
        class="hidden-element"
      />
    </div>
  </div>
</template>

<style scoped>
.portfolio {
  display: flex;
  flex-direction: column;
  width: 100%;
}

.portfolio-header {
  margin-bottom: 1.5rem;
}

.project-count {
  color: var(--primary);
  font-size: 0.875rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  margin-bottom: 0.5rem;
}

.portfolio-description {
  color: var(--text-20);
  margin-top: 0.75rem;
  font-size: 1.125rem;
  max-width: 45ch;
}

.portfolio-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 1.5rem;
  width: 100%;
}

@media screen and (min-width: 768px) {
  .portfolio-header {
    margin-bottom: 2rem;
  }

  .portfolio-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}
</style>
