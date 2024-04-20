<script setup>
import { useI18n } from 'vue-i18n';

const { t, locale } = useI18n();
</script>

<template>
    <div class="flex flex-col items-center justify-center h-[55vh]">
        <h1 v-html="t('404.title')"></h1>
        <p class="text-text-30 text-center" v-html="t('404.description')"></p>
        <RouterLink :to="{ name: `home_${locale}` }" class="btn btn-primary mt-4" v-html="t('404.button')"></RouterLink>
    </div>
</template>
