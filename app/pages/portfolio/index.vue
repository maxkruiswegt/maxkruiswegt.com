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
    <h1 class="hidden-element">{{ t('portfolio.title') }}</h1>
    <p class="hidden-element">{{ t('portfolio.description') }}</p>
    <div class="portfolio-projects">
      <ProjectPreview
        v-for="(project, index) in projects"
        :key="project.path"
        :id="project.stem.split('/').at(-1) ?? project.stem"
        :title="project.title"
        :description="project.description"
        :image="project.images[0] ?? ''"
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

/* Most tablets (768px and up) */
@media only screen and (min-width: 768px) {
  .portfolio-projects {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}

/* Large devices and wide screens (1200px and up) */
@media only screen and (min-width: 1200px) {
  .portfolio-projects {
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }
}
</style>
