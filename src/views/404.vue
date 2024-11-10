<script setup>
import { useI18n } from 'vue-i18n';

const { t, locale } = useI18n();
</script>

<template>
  <div class="unknown-page">
    <h1 v-html="t('404.title')"></h1>
    <p
      class="unknown-text"
      v-html="t('404.description')"
    ></p>
    <RouterLink
      :to="{ name: `home_${locale}` }"
      class="unknown-button btn btn-primary"
      v-html="t('404.button')"
    ></RouterLink>
  </div>
</template>

<style scoped>
/* Extra Small Devices (Less than 576px) */
.unknown-page {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 55vh;
}

.unknown-text {
  color: var(--text-30);
  text-align: center;
}

.unknown-button {
  margin-top: 1rem;
}

/* Small Devices */
@media screen and (min-width: 576px) {
}

/* Medium Devices */
@media screen and (min-width: 768px) {
}

/* Large Devices*/
@media screen and (min-width: 992px) {
}

/* Extra Large Devices */
@media screen and (min-width: 1200px) {
}

/* Extra Extra Large Devices */
@media screen and (min-width: 1600px) {
}

/* Very Large Devices */
@media screen and (min-width: 2560px) {
}
</style>
