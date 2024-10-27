<script setup>
import { useI18n } from 'vue-i18n';

const { t, locale } = useI18n();

const props = defineProps({
  id: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
});
</script>

<template>
  <div class="project-preview">
    <h4>{{ title }}</h4>
    <p class="description">{{ description }}</p>
    <img
      :src="image"
      alt="Project Image"
      class="project-image"
    />
    <RouterLink
      :to="{ name: `project_${locale}`, params: { id: id } }"
      class="btn btn-primary"
      >{{ t('portfolio.viewButton') }}</RouterLink
    >
  </div>
</template>

<style scoped>
.project-preview {
  background-color: var(--background-10);
  box-shadow: 1px 2px 4px rgba(0, 0, 0, 0.1);
  border-radius: 0.5rem;
  padding: 1.5rem;
}

.description {
  margin-bottom: 1rem;
  word-break: break-word;
}

.project-image {
  width: 100%;
  border-radius: 0.5rem;
  margin-bottom: 1rem;
  aspect-ratio: 16 / 9;
  object-fit: cover;
}

.btn-primary {
  margin-top: 0.5rem;
}
</style>
