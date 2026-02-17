<script setup lang="ts">
const localePath = useLocalePath();

defineProps<{
  id: string;
  title: string;
  description: string;
  image: string;
}>();
</script>

<template>
  <NuxtLink
    :to="localePath(`/portfolio/${id}`)"
    class="project-card"
  >
    <div class="project-image">
      <img
        :src="image"
        :alt="title"
        loading="lazy"
      />
    </div>
    <div class="project-content">
      <h2>{{ title }}</h2>
      <p class="description">{{ description }}</p>
    </div>
  </NuxtLink>
</template>

<style scoped>
.project-card {
  display: flex;
  flex-direction: column;
  border-radius: 0.75rem;
  overflow: hidden;
  background-color: var(--surface);
  border: 1px solid var(--background-20);
  text-decoration: none;
  color: inherit;
  transition:
    border-color 150ms ease,
    transform 150ms ease,
    box-shadow 150ms ease;
}

.project-card:hover {
  border-color: var(--primary);
  transform: translateY(-4px);
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.15);
}

.project-image {
  overflow: hidden;
}

.project-image img {
  width: 100%;
  aspect-ratio: 16/9;
  object-fit: cover;
  display: block;
}

.project-content {
  padding: 1.25rem;
}

.project-content h2 {
  font-size: 1.333rem;
  line-height: 1.3;
}

.description {
  margin-top: 0.375rem;
  color: var(--text-20);
  font-size: 0.875rem;
  line-height: 1.5;
}

@media (prefers-reduced-motion: reduce) {
  .project-card {
    transition: border-color 150ms ease;
  }

  .project-card:hover {
    transform: none;
  }
}
</style>
