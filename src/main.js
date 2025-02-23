import { createApp } from 'vue';
import { createPinia } from 'pinia';
import { useAccountStore } from '@/stores/AccountStore';

import App from './App.vue';
import router from './router';

// Translations
import { createI18n } from 'vue-i18n';
import en from './locales/en.json';
import nl from './locales/nl.json';

// Tables
import Vue3EasyDataTable from 'vue3-easy-data-table';
import 'vue3-easy-data-table/dist/style.css';

export const i18n = createI18n({
  legacy: false,
  locale: 'en',
  fallbackLocale: 'en',
  messages: {
    en,
    nl,
  },
});

const app = createApp(App);

app.use(createPinia());
app.use(router);
app.use(i18n);

// Components
app.component('EasyDataTable', Vue3EasyDataTable);

// Load the user's login state
const accountStore = useAccountStore();
accountStore
  .load()
  .then(() => {
    app.mount('#app');
  })
  .catch((err) => {
    console.error(err);
    app.mount('#app');
  });

// Apply saved theme
const savedTheme = localStorage.getItem('theme');
if (savedTheme === 'light') {
  document.documentElement.classList.add(savedTheme);
}
