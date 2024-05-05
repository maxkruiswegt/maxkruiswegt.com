<script setup>
import { onMounted, ref } from 'vue';
import { useI18n } from 'vue-i18n';
import markdownit from 'markdown-it';
import axios from 'axios';
import { useRouter } from 'vue-router';

// Carousel
import 'vue3-carousel/dist/carousel.css'
import { Carousel, Slide, Pagination, Navigation } from 'vue3-carousel'

const { t, tm, locale } = useI18n();
const md = markdownit();
const router = useRouter();

const props = defineProps({
    id: {
        type: String,
        required: true
    }
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

        md.renderer.rules.link_open = function (tokens, idx, options, env, self) {
            tokens[idx].attrPush(['class', 'markdown-link']);
            tokens[idx].attrPush(['target', '_blank']);
            return self.renderToken(tokens, idx, options);
        };

        md.renderer.rules.paragraph_open = function (tokens, idx, options, env, self) {
            tokens[idx].attrPush(['class', 'markdown-text']);
            return self.renderToken(tokens, idx, options);
        };

        markdown.value = md.render(file.data);
    } catch (error) {
        markdown.value = error.message;
    }
});
</script>

<template>
    <div class="w-full markdown-page my-10">
        <div class="flex mb-4">
            <RouterLink :to="{ name: `portfolio_${locale}` }" class="transition duration-300 hover:text-primary hover:scale-105 flex gap-1">
                <span class="material-symbols-outlined">arrow_back</span>
                <p>{{ t('portfolio.backButton') }}</p>
            </RouterLink>
        </div>
        <h3 class="mb-1">{{ t(`portfolio.projects.${props.id}.title`) }}</h3>
        <Carousel class="mb-5">
            <Slide v-for="(image, index) in tm(`portfolio.projects.${props.id}.images`)" :key="index" class="rounded-lg overflow-hidden">
                <img :src="image" alt="Project image" class="rounded-lg border-2 border-text aspect-video object-cover" />
            </Slide>
            <template #addons>
                <Navigation />
                <Pagination />
            </template>
        </Carousel>
        <div v-if="markdown" v-html="markdown"></div>
    </div>
</template>

<style>
.carousel__slide {
  @apply p-0.5;
}

.carousel__prev, .carousel__next {
    @apply text-text duration-300 hover:text-primary;
}

.carousel__pagination-button::after {
    @apply bg-text duration-200 hover:bg-primary;
}

.carousel__pagination-button--active::after {
    @apply bg-primary;
}

.markdown-page {
    @apply max-w-prose;
}

.markdown-link {
    @apply text-primary;
}

.markdown-link:hover {
    @apply text-primary-20 underline;
}

.markdown-text {
    @apply break-normal;
}
</style>
