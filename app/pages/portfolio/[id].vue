<script setup lang="ts">
import 'vue3-carousel/dist/carousel.css';
import { Carousel, Slide, Pagination, Navigation } from 'vue3-carousel';

const { locale } = useI18n();
const route = useRoute();
const router = useRouter();
const localePath = useLocalePath();

definePageMeta({
  validate: (route) => {
    const id = route.params.id as string;
    return /^[a-z0-9-]+$/.test(id);
  },
});

const id = route.params.id as string;
const collectionName = computed(() => `projects_${locale.value}` as 'projects_en' | 'projects_nl');

const { data: project } = await useAsyncData(
  `project-${locale.value}-${id}`,
  () => queryCollection(collectionName.value).where('stem', 'LIKE', `%/${id}`).first(),
  { watch: [locale] }
);

if (!project.value) {
  throw createError({ statusCode: 404, statusMessage: 'Project not found', fatal: true });
}

useHead({
  title: computed(() => project.value?.title ?? ''),
});

useSeoMeta({
  ogTitle: computed(() => project.value?.title ?? ''),
  description: computed(() => project.value?.description ?? ''),
  ogDescription: computed(() => project.value?.description ?? ''),
  ogImage: computed(() => project.value?.images?.[0] ?? ''),
});

const adjustObjectFit = (event: Event) => {
  const img = event.target as HTMLImageElement;
  const aspectRatio = img.naturalWidth / img.naturalHeight;

  if (aspectRatio > 1) {
    img.style.objectFit = 'cover';
    img.style.width = '100%';
  } else {
    img.style.objectFit = 'contain';
  }
};

function goBack() {
  const backUrl = router.options.history.state.back;
  if (typeof backUrl === 'string' && backUrl.includes('portfolio')) {
    router.back();
  } else {
    navigateTo(localePath('/portfolio'));
  }
}
</script>

<template>
  <div
    v-if="project"
    class="project-page hidden-element"
  >
    <div class="back-button-wrapper">
      <button
        @click="goBack"
        class="back-button"
      >
        <span class="material-symbols-outlined">arrow_back</span>
        <p>{{ $t('buttons.back') }}</p>
      </button>
    </div>
    <h1 class="project-title">{{ project.title }}</h1>
    <ClientOnly>
      <Carousel class="project-carousel">
        <Slide
          v-for="(image, index) in project.images"
          :key="index"
          class="carousel-slide"
        >
          <img
            :src="image"
            @load="adjustObjectFit"
            :alt="`${project.title} - screenshot ${index + 1}`"
            class="carousel-image"
          />
        </Slide>
        <template #addons>
          <Navigation />
          <Pagination />
        </template>
      </Carousel>
    </ClientOnly>
    <div class="prose">
      <ContentRenderer :value="project" />
    </div>
  </div>
</template>

<style scoped>
/* Default styles: Mobile first */
.project-page {
  width: 100%;
  max-width: 60ch;
  align-self: center;
}

.back-button-wrapper {
  display: flex;
  margin-bottom: 1rem;
}

.back-button {
  display: flex;
  gap: 0.25rem;
  transition:
    color 150ms ease,
    transform 150ms ease;
  cursor: pointer;
}

.back-button:hover {
  color: var(--primary);
  transform: scale(1.025);
}

.project-title {
  font-size: 1.777rem;
  line-height: 1.3;
  margin-bottom: 0.25rem;
}

@media screen and (min-width: 992px) {
  .project-title {
    font-size: 2.369rem;
  }
}

.project-carousel {
  margin-bottom: 1.25rem;
}

.carousel-slide {
  overflow: hidden;
  border-radius: 0.5rem;
}

.carousel-image {
  border-radius: 0.5rem;
  border: 2px solid var(--text);
  width: 100%;
  height: auto;
  aspect-ratio: 16/9;
  object-fit: cover;
}
</style>
