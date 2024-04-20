<script setup>
import { useI18n } from 'vue-i18n';

const { t, locale } = useI18n();
</script>

<template>
    <div class="mt-[10vh] mb-[20vh] lg:mt-[25vh] lg:mb-[35vh] flex justify-center">
        <div class="flex flex-col items-center lg:flex-row lg:border-b-2 lg:border-text gap-8 lg:gap-20">
            <div>
                <img src="/images/Max.png" alt="Max Kruiswegt" class="h-80" />
            </div>
            <div>
                <div class="text-center lg:text-left">
                    <h1 v-html="t('home.title')"></h1>
                </div>
                <div class="flex justify-center lg:justify-normal gap-4 mt-4">
                    <RouterLink :to="{ name: `portfolio_${locale}` }" class="btn btn-secondary" v-html="t('home.buttonWork')"></RouterLink>
                    <RouterLink :to="{ name: `contact_${locale}` }" class="btn btn-primary" v-html="t('home.buttonContact')"></RouterLink>
                </div>
            </div>
        </div>
    </div>
</template>
