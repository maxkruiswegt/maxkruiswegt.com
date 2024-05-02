<script setup>
import { useI18n } from 'vue-i18n';

const { t, locale } = useI18n();

const props = defineProps({
    id: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    }
});
</script>

<template>
    <div class="bg-background-10 shadow-md rounded-lg p-6">
        <h4>{{ title }}</h4>
        <p class="mb-4 break-normal">{{ description }}</p>
        <img :src="image" alt="Project Image" class="rounded-lg mb-4" />
        <RouterLink :to="{ name: `project_${locale}`, params: { id: id }}" class="btn btn-primary mt-2">{{ t('portfolio.viewButton') }}</RouterLink>
    </div>
</template>