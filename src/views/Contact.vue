<script setup>
import { useI18n } from 'vue-i18n';

const { t, locale } = useI18n();
</script>

<template>
    <div class="flex flex-col items-center justify-center h-[55vh]">
        <h1 class="text-center text-4xl" v-html="t('construction.title')"></h1>
        <p class="text-text-30 text-center" v-html="t('construction.description')"></p>
        <RouterLink :to="{ name: `home_${locale}` }" class="btn btn-primary mt-4" v-html="t('construction.button')"></RouterLink>
    </div>
</template>