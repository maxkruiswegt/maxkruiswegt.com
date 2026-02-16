export function useMkDevelopmentUrl() {
  const { locale } = useI18n();
  return computed(() => (locale.value === 'nl' ? 'https://mkdevelopment.nl' : 'https://mkdevelopment.nl/en'));
}
