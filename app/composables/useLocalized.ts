import type { Locale, Localized } from '~/data/site';

// Content data carries both languages side by side ({ en, nl }); this picks the active one and
// formats numbers and dates the way each language writes them (5,800 vs 5.800).
export function useLocalized() {
  const { locale } = useI18n();
  const lang = computed(() => locale.value as Locale);
  const tag = computed(() => (lang.value === 'nl' ? 'nl-NL' : 'en-GB'));

  const pick = (value: Localized) => value[lang.value];

  const number = (value: number, options?: Intl.NumberFormatOptions) =>
    new Intl.NumberFormat(tag.value, options).format(value);

  // 'YYYY-MM' or 'YYYY-MM-DD' strings, parsed as UTC so SSR and the browser agree. English short
  // months come from en-US: en-GB writes "Sept" next to "Feb" and "Jun".
  const monthYear = (iso: string) =>
    new Intl.DateTimeFormat(lang.value === 'nl' ? 'nl-NL' : 'en-US', {
      month: 'short',
      year: 'numeric',
      timeZone: 'UTC',
    }).format(
      new Date(`${iso.length === 7 ? `${iso}-01` : iso}T00:00:00Z`)
    );

  // A no-break space after the day keeps "6 October" on one line.
  const longDate = (iso: string) =>
    new Intl.DateTimeFormat(tag.value, { day: 'numeric', month: 'long', year: 'numeric', timeZone: 'UTC' })
      .format(new Date(`${iso}T00:00:00Z`))
      .replace(/^(\d+) /, '$1\u00A0');

  return { lang, pick, number, monthYear, longDate };
}
