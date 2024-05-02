<script setup>
import { onMounted, ref } from 'vue';
import { useI18n } from 'vue-i18n';
import markdownit from 'markdown-it';
import axios from 'axios';
import { useRouter } from 'vue-router';

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
        <div class="mb-4 flex">
            <RouterLink :to="{ name: `portfolio_${locale}` }" class="transition duration-300 hover:text-primary hover:scale-105 flex gap-1">
                <span class="material-symbols-outlined">arrow_back</span>
                <p>{{ t('portfolio.backButton') }}</p>
            </RouterLink>
        </div>
        <div v-if="markdown" v-html="markdown"></div>
    </div>
</template>

<style>
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
