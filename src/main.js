import './style.css';

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

// Translations
import { createI18n } from 'vue-i18n'
import en from './locales/en.json'
import nl from './locales/nl.json'

export const i18n = createI18n({
    legacy: false,
    locale: 'en',
    fallbackLocale: 'en',
    messages: {
        en,
        nl
    }
})

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(i18n)

app.mount('#app')

// Apply saved theme
const savedTheme = localStorage.getItem('theme')
if (savedTheme === 'light') {
    document.documentElement.classList.add(savedTheme)
}