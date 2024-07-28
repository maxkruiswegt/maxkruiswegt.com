<script setup>
import Project from '@/components/ProjectPreview.vue';
import { onMounted } from 'vue';
import { useI18n } from 'vue-i18n';

const { t, tm, locale } = useI18n();

onMounted(() => {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      entry.target.classList.toggle('show-element', entry.isIntersecting);
      // observer.unobserve(entry.target);
    })
  });

  const hiddenElements = document.querySelectorAll('.hidden-element');
  hiddenElements.forEach((element) => {
    observer.observe(element);
  });
});
</script>

<template>
  <div>
    <h1 class="hidden-element">{{ t('portfolio.title') }}</h1>
    <p class="text-lg break-normal hidden-element">{{ t('portfolio.description') }}</p>
    <div class="grid grid-cols-1 gap-4 mt-8 sm:grid-cols-2 lg:grid-cols-3">
      <Project v-for="(project, key, index) in tm('portfolio.projects')" :key="key" :id="key" :title="project.title"
        :description="project.description" :image="project.images[0]" :style="{ 'transition-delay': `${index * 0.2}s` }"
        class="hidden-element" />
    </div>
  </div>
</template>