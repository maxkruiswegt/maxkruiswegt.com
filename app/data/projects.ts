import type { Localized } from './site';

export interface SideProject {
  id: string;
  name: string;
  href?: string;
  /** Round icon, shown next to the name. */
  icon: string;
  /** Years active; no `end` means the project is still running. */
  start: number;
  end?: number;
  stack: string;
  line: Localized;
}

export const sideProjects: SideProject[] = [
  {
    id: 'meteo',
    name: 'Meteo Zandvoort',
    href: 'https://meteozandvoort.nl',
    icon: '/images/projects/meteo.svg',
    start: 2024,
    stack: 'Vue, TypeScript',
    line: {
      en: 'Live weather for Zandvoort from a local weather station, with charts, history and a beach cam.',
      nl: 'Live weer in Zandvoort van een lokaal weerstation, met grafieken, historie en een strandcam.',
    },
  },
  {
    id: 'cody',
    name: 'Cody',
    icon: '/images/projects/cody.webp',
    start: 2023,
    end: 2026,
    stack: 'C#, MySQL',
    line: {
      en: 'A Discord bot for a study server, with Pomodoro timers, study-time tracking and leaderboards. Now retired, and in hindsight the first prototype of Kaizen.',
      nl: 'Een Discord-bot voor een studieserver, met Pomodoro-timers, studietijd bijhouden en ranglijsten. Inmiddels uit de lucht, en achteraf het eerste prototype van Kaizen.',
    },
  },
];
