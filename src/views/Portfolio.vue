<script setup>
import Project from '@/components/ProjectPreview.vue';
import { useI18n } from 'vue-i18n';

const { t, tm, locale } = useI18n();
</script>

<template>
    <div>
        <h1>{{ t('portfolio.title') }}</h1>
        <p class="text-lg break-normal">{{ t('portfolio.description') }}</p>
        <div class="grid grid-cols-1 gap-4 mt-8 sm:grid-cols-2 lg:grid-cols-3">
            <Project
                v-for="(project, key) in tm('portfolio.projects')"
                :key="key"
                :id="key"
                :title="project.title"
                :description="project.description"
                :image="project.images[0]"
            />
        </div>
    </div>
</template>