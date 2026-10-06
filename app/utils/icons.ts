// A small hand-drawn set (24px grid, 1.5px stroke) instead of an icon font: about a dozen glyphs
// are used, so inline paths cost less than one font request.
export const icons = {
  'arrow-right': ['M5 12h14', 'M13 6l6 6-6 6'],
  'arrow-up-right': ['M7 17L17 7', 'M8.5 7H17v8.5'],
  sun: [
    'M8 12a4 4 0 1 0 8 0a4 4 0 1 0-8 0',
    'M12 2.75v1.75',
    'M12 19.5v1.75',
    'M4.75 4.75l1.25 1.25',
    'M18 18l1.25 1.25',
    'M2.75 12H4.5',
    'M19.5 12h1.75',
    'M4.75 19.25L6 18',
    'M18 6l1.25-1.25',
  ],
  moon: ['M19.5 14.6A7.5 7.5 0 0 1 9.4 4.5a7.5 7.5 0 1 0 10.1 10.1z'],
  monitor: [
    'M4.5 4.5h15A1.5 1.5 0 0 1 21 6v8.5a1.5 1.5 0 0 1-1.5 1.5h-15A1.5 1.5 0 0 1 3 14.5V6a1.5 1.5 0 0 1 1.5-1.5z',
    'M8.5 20h7',
    'M12 16v4',
  ],
  copy: [
    'M10 8.5h8a1.5 1.5 0 0 1 1.5 1.5v8a1.5 1.5 0 0 1-1.5 1.5h-8A1.5 1.5 0 0 1 8.5 18v-8A1.5 1.5 0 0 1 10 8.5z',
    'M15.5 8.5V6A1.5 1.5 0 0 0 14 4.5H6A1.5 1.5 0 0 0 4.5 6v8A1.5 1.5 0 0 0 6 15.5h2.5',
  ],
  check: ['M5 12.5l4.5 4.5L19 7.5'],
  menu: ['M4 8.5h16', 'M4 15.5h16'],
  close: ['M6.5 6.5l11 11', 'M17.5 6.5l-11 11'],
} as const;

export type IconName = keyof typeof icons;
