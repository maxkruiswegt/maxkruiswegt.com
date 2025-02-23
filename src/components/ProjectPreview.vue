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
  <RouterLink
    :to="{ name: `project_${locale}`, params: { id: id } }"
    class="project-preview"
    :style="{ backgroundImage: `url(${image})` }"
  >
    <div class="overlay">
      <div class="content">
        <h4>{{ title }}</h4>
        <p class="description">{{ description }}</p>
      </div>
    </div>
  </RouterLink>
</template>

<style scoped>
/* Default styles: Mobile first */
.project-preview {
  position: relative;
  border-radius: 0.5rem;
  width: 100%;
  aspect-ratio: 16/9;
  background-size: cover;
  background-position: center;
  text-decoration: none;
  color: white;
  display: block;
  overflow: hidden;
  box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.3);
}

.overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: flex-end;
  transition: background-color 0.2s ease-out, transform 0.2s ease-out;
}

.overlay:hover {
  background-color: rgba(0, 0, 0, 0.3);
  transform: scale(1.02);
}

.content {
  padding: 1.5rem;
}

.description {
  margin-top: 0.5rem;
  word-break: break-word;
  opacity: 0.9;
}
</style>
