import { defineStore } from "pinia";
import { computed, ref } from "vue";

export const useThemeStore = defineStore("theme", () => {
    const theme = ref('localStorage' in window ? (localStorage.getItem('theme') || 'dark') : 'dark');

    const icon = computed(() => theme.value === 'light' ? 'light_mode' : 'dark_mode');
    const logo = computed(() => theme.value === 'light' ? '/images/MKLogo.webp' : '/images/MKLogoLight.webp');

    function toggleTheme(){
        theme.value = theme.value === 'dark' ? 'light' : 'dark';
        document.documentElement.classList.toggle('light');
        localStorage.setItem('theme', theme.value);
    }

    return {
        theme,
        icon,
        logo,
        toggleTheme
    }
});