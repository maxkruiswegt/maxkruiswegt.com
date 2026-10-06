import type { Localized } from './site';

export interface Entry {
  id: string;
  /** ISO year-month; `end` omitted means "present". */
  start: string;
  end?: string;
  role: Localized;
  place: string;
  note: Localized;
}

// Oldest first: the section reads as a timeline from left to right, ending at the present.
export const experience: Entry[] = [
  {
    id: 'koi',
    start: '2023-01',
    end: '2024-12',
    role: { en: 'Community manager, later web admin', nl: 'Communitymanager, later webbeheerder' },
    place: 'Koi (Cajun Koi Academy)',
    note: {
      en: 'The study community of YouTube creators Mike and Matty. I moderated it and coordinated its sub-teams, and later fixed and improved its website.',
      nl: 'De studiecommunity van YouTubers Mike en Matty. Ik modereerde de community en coördineerde de subteams, en later verbeterde ik de website.',
    },
  },
  {
    id: 'dtt-intern',
    start: '2024-09',
    end: '2025-01',
    role: { en: 'Frontend intern', nl: 'Frontend-stagiair' },
    place: 'DTT, Amsterdam',
    note: {
      en: 'My third-year placement and my first frontend work in a professional team, on Vue web apps. DTT hired me afterwards.',
      nl: 'Mijn derdejaarsstage en mijn eerste frontendwerk in een professioneel team, aan Vue-webapps. Daarna nam DTT me aan.',
    },
  },
  {
    id: 'dtt',
    start: '2025-02',
    end: '2026-06',
    role: { en: 'Frontend developer', nl: 'Frontend-developer' },
    place: 'DTT, Amsterdam',
    note: {
      en: 'Vue web apps, CMSes and a React Native app for clients, built from shared components and reviewed in a team.',
      nl: 'Vue-webapps, CMS’en en een React Native-app voor klanten, opgebouwd uit gedeelde componenten en gereviewd in een team.',
    },
  },
  {
    id: 'kaizen',
    start: '2025-09',
    role: { en: 'Founder and developer', nl: 'Oprichter en developer' },
    place: 'Kaizen',
    note: {
      en: 'Built and shipped on my own: the app, the Supabase backend, subscriptions and releases in three stores and on the web.',
      nl: 'In mijn eentje gebouwd en uitgebracht: de app, de Supabase-backend, abonnementen en releases in drie stores en op het web.',
    },
  },
];

export interface Degree {
  name: Localized;
  place: string;
  /** Same shape as a client logo: a single-colour mask, plus the colour versions per theme. */
  logo: { src: string; ratio: number; color?: { src: string; ratio: number }; dark?: string };
  status: Localized;
  highlights: { label: Localized; text: Localized; href?: string }[];
  /** Straight from the official transcript; course names as written there, except the minor project. */
  transcript: {
    average: number;
    credits: number;
    /** Official final grades per unit, not the part scores within a unit. */
    grades: { course: Localized; grade: number }[];
  };
}

export const education: Degree = {
  name: { en: 'BSc Information Technology', nl: 'BSc Informatica' },
  place: 'Hogeschool Inholland, Haarlem',
  logo: {
    src: '/images/education/inholland.png',
    ratio: 1,
    color: { src: '/images/education/color/inholland.png', ratio: 1 },
    dark: '/images/education/color/inholland.png',
  },
  status: {
    en: 'Graduated in July 2026 at the age of 20, in four years.',
    nl: 'Afgestudeerd in juli 2026 op mijn twintigste, in vier jaar.',
  },
  highlights: [
    {
      label: { en: 'Thesis at DTT', nl: 'Afstudeeronderzoek bij DTT' },
      text: {
        en: 'When should a project use one React Native codebase, and when a PWA? The answer became a small decision tool.',
        nl: 'Wanneer kies je voor één React Native-codebase, en wanneer voor een PWA? Het antwoord werd een kleine beslistool.',
      },
      href: 'https://kader.maxkruiswegt.com',
    },
    {
      label: { en: 'Minor App Design & Development', nl: 'Minor App Design & Development' },
      text: {
        en: 'A semester of building a cross-platform app on my own: interviews and requirements, an interactive prototype, then a React Native app with automated tests and CI/CD. I also won a hackathon here, and Kaizen started in this minor.',
        nl: 'Een semester lang in mijn eentje een cross-platform app bouwen: interviews en requirements, een interactief prototype, en daarna een React Native-app met geautomatiseerde tests en CI/CD. Ik won hier ook een hackathon, en Kaizen begon in deze minor.',
      },
    },
    {
      label: { en: 'Minor Data & AI', nl: 'Minor Data & AI' },
      text: {
        en: 'An ECG classifier for MEDxAI, with four other students: a fine-tuned Wav2Vec2 model behind a FastAPI backend and a Vue frontend.',
        nl: 'Met vier andere studenten een ECG-classifier voor MEDxAI: een gefinetuned Wav2Vec2-model achter een FastAPI-backend en een Vue-frontend.',
      },
    },
  ],
  transcript: {
    average: 8,
    credits: 240,
    // The highest grades, one line per course: 10s first, then 9s, most recent first.
    grades: [
      { course: { en: 'Web Development 1', nl: 'Web Development 1' }, grade: 10 },
      { course: { en: 'Java Advanced', nl: 'Java Advanced' }, grade: 10 },
      { course: { en: 'Programming 2', nl: 'Programming 2' }, grade: 10 },
      { course: { en: 'Frontend Development 1', nl: 'Frontend Development 1' }, grade: 9 },
      { course: { en: 'Frontend Development 2', nl: 'Frontend Development 2' }, grade: 9 },
      // Listed as "Project Implementation", the minor's project unit.
      { course: { en: 'Minor project: React Native app', nl: 'Minorproject: React Native-app' }, grade: 9 },
      { course: { en: 'Internship at DTT', nl: 'Stage bij DTT' }, grade: 9 },
      { course: { en: 'Web Development 2', nl: 'Web Development 2' }, grade: 9 },
      { course: { en: 'Design Patterns', nl: 'Design Patterns' }, grade: 9 },
    ],
  },
};
