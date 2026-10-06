<script setup lang="ts">
import { kaizenFigures, site } from '~/data/site';

const { t, locale } = useI18n();
const { number } = useLocalized();

const description = () => t('meta.homeDescription', { signups: number(kaizenFigures.signups) });

useHead({ title: () => t('meta.homeTitle') });

useSeoMeta({
  description,
  ogTitle: 'Max Kruiswegt',
  ogDescription: description,
  ogImage: () => `${site.url}/og/home-${locale.value}.png`,
  ogImageWidth: 1200,
  ogImageHeight: 630,
  ogImageAlt: () => t('meta.ogAlt'),
});
</script>

<template>
  <div>
    <HomeHero />
    <HomeKaizen />
    <HomeEducation />
    <HomeExperience />
    <HomeWork />
    <HomeProjects />
    <HomeContact />
  </div>
</template>
