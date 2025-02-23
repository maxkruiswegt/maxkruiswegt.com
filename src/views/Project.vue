<script setup>
import { onMounted, ref } from 'vue';
import { useI18n } from 'vue-i18n';
import markdownit from 'markdown-it';
import axios from 'axios';
import { useRouter } from 'vue-router';

// Carousel
import 'vue3-carousel/dist/carousel.css';
import { Carousel, Slide, Pagination, Navigation } from 'vue3-carousel';

const { t, tm, locale } = useI18n();
const md = markdownit();
const router = useRouter();

const props = defineProps({
  id: {
    type: String,
    required: true,
  },
});

const markdown = ref('');

onMounted(async () => {
  try {
    const projectKey = `portfolio.projects.${props.id}`;

    if (Object.keys(tm(projectKey)).length === 0) {
      throw new Error('Project not found');
    }

    const file = await axios.get(`/markdown/${locale.value}/${props.id}.md`);
    if (!file.data || file.data.startsWith('<!DOCTYPE html>')) {
      throw new Error('Content not found');
    }

    setRendererRules();

    // Render markdown content
    markdown.value = md.render(file.data);
  } catch (error) {
    markdown.value = error.message;
  }
});

const setRendererRules = () => {
  md.renderer.rules.link_open = function (tokens, idx, options, env, self) {
    tokens[idx].attrPush(['class', 'markdown-link']);
    tokens[idx].attrPush(['target', '_blank']);
    return self.renderToken(tokens, idx, options);
  };

  md.renderer.rules.paragraph_open = function (tokens, idx, options, env, self) {
    tokens[idx].attrPush(['class', 'markdown-text']);
    return self.renderToken(tokens, idx, options);
  };

  md.renderer.rules.bullet_list_open = function (tokens, idx, options, env, self) {
    tokens[idx].attrPush(['class', 'markdown-bullet-list']);
    return self.renderToken(tokens, idx, options);
  };

  md.renderer.rules.ordered_list_open = function (tokens, idx, options, env, self) {
    tokens[idx].attrPush(['class', 'markdown-ordered-list']);
    return self.renderToken(tokens, idx, options);
  };
};

// Adjust object-fit for images in the carousel
const adjustObjectFit = (event) => {
  const img = event.target;
  const aspectRatio = img.naturalWidth / img.naturalHeight;

  if (aspectRatio > 1) {
    // Image is wider than tall, suitable for 'cover'
    img.style.objectFit = 'cover';
    img.style.width = '100%';
  } else {
    // Image is as tall as or taller than it is wide, suitable for 'contain'
    img.style.objectFit = 'contain';
  }
};

function goBack() {
  const backUrl = router.options.history.state.back;
  const route = router.resolve({ path: `${backUrl}` });

  if (route.name === `portfolio_${locale.value}`) {
    router.back();
  } else {
    router.push({ name: `portfolio_${locale.value}` });
  }
}
</script>

<template>
  <div class="project-page hidden-element">
    <div class="back-button-wrapper">
      <button
        @click="goBack"
        class="back-button"
      >
        <span class="material-symbols-outlined">arrow_back</span>
        <p>{{ t('buttons.back') }}</p>
      </button>
    </div>
    <h3 class="project-title">{{ t(`portfolio.projects.${props.id}.title`) }}</h3>
    <Carousel class="project-carousel">
      <Slide
        v-for="(image, index) in tm(`portfolio.projects.${props.id}.images`)"
        :key="index"
        class="carousel-slide"
      >
        <img
          :src="image"
          @load="adjustObjectFit"
          alt="Project image"
          class="carousel-image"
          ref="imageElement"
        />
      </Slide>
      <template #addons>
        <Navigation />
        <Pagination />
      </template>
    </Carousel>
    <div
      v-if="markdown"
      v-html="markdown"
    ></div>
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
  transition: all 0.3s;
}

.back-button:hover {
  color: var(--primary);
  transform: scale(1.05);
}

.project-title {
  margin-bottom: 0.25rem;
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

/* Smaller phone viewpoints (380px and up) */
@media screen and (min-width: 380px) {
}

/* Small devices and most phones (480px and up) */
@media only screen and (min-width: 480px) {
}

/* Most tablets (768px and up) */
@media only screen and (min-width: 768px) {
}

/* Smaller desktop viewpoints (992px and up) */
@media only screen and (min-width: 992px) {
}

/* Large devices and wide screens (1200px and up) */
@media only screen and (min-width: 1200px) {
}
</style>
