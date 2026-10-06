import type { Localized } from './site';

export interface Client {
  id: string;
  name: string;
  logo: {
    /** Single-colour artwork on transparency, drawn in the text colour as a CSS mask. */
    src: string;
    /** Width / height of the artwork, used to size marks by area instead of by width. */
    ratio: number;
    /** Optical correction: below 1 for bold, dense marks; above 1 for thin, light ones. */
    scale?: number;
    /** Full-colour artwork for light mode, for raster logos (SVGs keep their own colours in `src`). */
    color?: { src: string; ratio: number; scale?: number };
  };
  /** The part I worked on, in a few words. */
  part: Localized;
  /** One line on what the product is. */
  about: Localized;
}

// Work at DTT, grouped by the kind of work: React Native app, web apps, CMSes, website. Each card
// says what the product is and which part I worked on.
export const clients: Client[] = [
  {
    id: 'grow-it',
    name: 'Grow It!',
    // Erasmus MC's logo: better known than the Grow It! wordmark.
    logo: {
      src: '/images/clients/erasmus-mc.png',
      ratio: 229 / 90,
      scale: 1.25,
      color: { src: '/images/clients/color/erasmus-mc.png', ratio: 229 / 90, scale: 1.25 },
    },
    part: { en: 'React Native app', nl: 'React Native-app' },
    about: {
      en: 'A research app for young people, from Erasmus MC-Sophia.',
      nl: 'Een onderzoeksapp voor jongeren, van het Erasmus MC-Sophia.',
    },
  },
  {
    id: 'medicinfo',
    name: 'Medicinfo',
    logo: { src: '/images/clients/medicinfo.svg', ratio: 160 / 27, scale: 0.82 },
    part: { en: 'Web app', nl: 'Webapp' },
    about: {
      en: 'A provider of remote GP care.',
      nl: 'Een aanbieder van huisartsenzorg op afstand.',
    },
  },
  {
    id: 'wme',
    name: 'World Metal Exchange',
    logo: { src: '/images/clients/wme.svg', ratio: 607 / 282, scale: 1.2 },
    part: { en: 'Web app', nl: 'Webapp' },
    about: {
      en: 'A trading platform for scrap metal.',
      nl: 'Een handelsplatform voor oud metaal.',
    },
  },
  {
    id: 'nullifire',
    name: 'Nullifire',
    logo: { src: '/images/clients/nullifire.svg', ratio: 155 / 39, scale: 0.88 },
    part: { en: 'Web app', nl: 'Webapp' },
    about: {
      en: 'An advice tool that helps contractors choose fire protection.',
      nl: 'Een adviestool waarmee aannemers de juiste brandwering kiezen.',
    },
  },
  {
    id: 'drug-check-up',
    name: 'Drug Check-up',
    logo: {
      src: '/images/clients/trimbos.png',
      ratio: 271 / 78,
      scale: 0.88,
      color: { src: '/images/clients/color/trimbos.png', ratio: 271 / 78, scale: 0.88 },
    },
    part: { en: 'Web app', nl: 'Webapp' },
    about: {
      en: 'An anonymous online self-test about drug use, from the Trimbos-instituut.',
      nl: 'Een anonieme online zelftest over drugsgebruik, van het Trimbos-instituut.',
    },
  },
  {
    id: 'slim-academy',
    name: 'Slim Academy',
    logo: { src: '/images/clients/slim-academy.svg', ratio: 431 / 130, scale: 1.1 },
    part: { en: 'Web app and CMS', nl: 'Webapp en CMS' },
    about: {
      en: 'A study platform for students.',
      nl: 'Een studieplatform voor studenten.',
    },
  },
  {
    id: 'mediamasters',
    name: 'MediaMasters',
    logo: { src: '/images/clients/mediamasters.svg', ratio: 1201 / 636, scale: 0.92 },
    part: { en: 'Game platform and CMS', nl: 'Gameplatform en CMS' },
    about: {
      en: 'The national media literacy game for primary schools.',
      nl: 'Het landelijke mediawijsheidsspel voor basisscholen.',
    },
  },
  {
    id: 'room',
    name: 'ROOM to grow',
    // Erasmus University's logo: far better known than ROOM's own icon.
    logo: {
      src: '/images/clients/eur.png',
      ratio: 600 / 562,
      scale: 1.25,
      color: { src: '/images/clients/color/eur.png', ratio: 600 / 563, scale: 1.25 },
    },
    part: { en: 'CMS', nl: 'CMS' },
    about: {
      en: 'A wellbeing app for students, from Erasmus University Rotterdam.',
      nl: 'Een welzijnsapp voor studenten, van de Erasmus Universiteit Rotterdam.',
    },
  },
  {
    id: 'teladoc',
    name: 'Teladoc Health',
    logo: { src: '/images/clients/teladoc.svg', ratio: 3 },
    part: { en: 'CMS', nl: 'CMS' },
    about: {
      en: 'A provider of virtual care and e-health apps.',
      nl: 'Een aanbieder van zorg op afstand en e-healthapps.',
    },
  },
  {
    id: 'btb-tech',
    name: 'BTB-Tech',
    logo: { src: '/images/clients/btb-tech.svg', ratio: 240 / 103, scale: 1.12 },
    part: { en: 'CMS', nl: 'CMS' },
    about: {
      en: 'A contractor for telecom networks.',
      nl: 'Een aannemer voor telecomnetwerken.',
    },
  },
  {
    id: 'geoballoon',
    name: 'GeoBalloon',
    logo: {
      src: '/images/clients/geoballoon.png',
      ratio: 122 / 179,
      scale: 0.9,
      color: { src: '/images/clients/color/geoballoon.png', ratio: 122 / 179, scale: 0.9 },
    },
    part: { en: 'CMS', nl: 'CMS' },
    about: {
      en: 'A location-based game with virtual balloons.',
      nl: 'Een locatiegebaseerde game met virtuele ballonnen.',
    },
  },
  {
    id: 'dtt',
    name: 'DTT',
    logo: { src: '/images/clients/dtt.svg', ratio: 3 },
    part: { en: 'Website', nl: 'Website' },
    about: {
      en: 'An app and web agency in Amsterdam.',
      nl: 'Een app- en webbureau in Amsterdam.',
    },
  },
];
