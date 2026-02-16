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
    class="project-preview"
    :style="{ backgroundImage: `url(${image})` }"
  >
    <div class="overlay">
      <div class="content">
        <h2>{{ title }}</h2>
        <p class="description">{{ description }}</p>
      </div>
    </div>
  </NuxtLink>
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
  transition:
    background-color 0.2s ease-out,
    transform 0.2s ease-out;
}

.overlay:hover {
  background-color: rgba(0, 0, 0, 0.3);
  transform: scale(1.02);
}

.content {
  padding: 1.5rem;
}

.content h2 {
  font-size: 1.333rem;
  line-height: 1.3;
}

@media screen and (min-width: 992px) {
  .content h2 {
    font-size: 1.777rem;
  }
}

.description {
  margin-top: 0.5rem;
  word-break: break-word;
  opacity: 0.9;
}
</style>
