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
      <h1>{{ t('portfolio.title') }}</h1>
      <p>{{ t('portfolio.description') }}</p>
    </div>
    <div class="portfolio-projects">
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
  text-align: center;
  margin-bottom: 2rem;
}

.portfolio-header p {
  color: var(--text-20);
  margin-top: 0.5rem;
}

.portfolio-projects {
  display: grid;
  grid-template-columns: 1fr;
  gap: 1.5rem;
  width: 100%;
}

@media screen and (min-width: 768px) {
  .portfolio-projects {
    grid-template-columns: repeat(2, 1fr);
  }
}
</style>
