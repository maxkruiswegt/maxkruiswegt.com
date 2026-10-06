// Facts that appear in more than one place. Update `updated` and the Kaizen figures together.

export const site = {
  url: 'https://maxkruiswegt.com',
  email: 'hi@maxkruiswegt.com',
  linkedin: 'https://www.linkedin.com/in/maxkruiswegt/',
  github: 'https://github.com/maxkruiswegt',
  dtt: { en: 'https://www.d-tt.nl/en', nl: 'https://www.d-tt.nl/' },
  updated: '2026-10-06',
} as const;

export const kaizenLinks = {
  site: 'https://my-kaizen.com',
  about: 'https://my-kaizen.com/about',
  web: 'https://my-kaizen.app/',
  appStore: 'https://apps.apple.com/app/id6755314708',
  googlePlay: 'https://play.google.com/store/apps/details?id=com.maxkruiswegt.kaizen',
  microsoftStore: 'https://apps.microsoft.com/detail/9MV8DVZ52JQS',
} as const;

// From Kaizen's admin panel, all time, read on `asOf`, rounded the way the copy words them.
export const kaizenFigures = {
  asOf: '2026-10-06',
  signups: 5800, // "more than"
  focusHours: 24000, // "more than"
  rating: 4.5,
} as const;

export type Locale = 'en' | 'nl';
export type Localized = Record<Locale, string>;
