import { skipHydrate } from 'pinia';

export const useThemeStore = defineStore('theme', () => {
  const theme = skipHydrate(ref('dark'));

  const icon = computed(() => (theme.value === 'light' ? 'light_mode' : 'dark_mode'));
  const logo = computed(() => (theme.value === 'light' ? '/images/MKLogo.webp' : '/images/MKLogoLight.webp'));

  function initTheme() {
    if (!import.meta.client) return;
    const stored = localStorage.getItem('theme') || 'dark';
    theme.value = stored;
    document.documentElement.classList.toggle('light', stored === 'light');
  }

  function toggleTheme() {
    theme.value = theme.value === 'dark' ? 'light' : 'dark';
    if (import.meta.client) {
      document.documentElement.classList.toggle('light', theme.value === 'light');
      localStorage.setItem('theme', theme.value);
    }
  }

  return {
    theme,
    icon,
    logo,
    initTheme,
    toggleTheme,
  };
});
