// Renders the Open Graph images (public/og/*.png) from the running dev server with headless
// Chrome. Cloudflare Pages can't run Chrome during its build, so the results are committed. Run
// after changing the OG layout or the copy it shows:
//
//   npm run dev            (in another terminal)
//   npm run export:assets  [base url, default http://localhost:3000]

import { execFileSync } from 'node:child_process';
import { existsSync, mkdirSync, mkdtempSync, rmSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join, resolve } from 'node:path';

const base = (process.argv[2] ?? 'http://localhost:3000').replace(/\/$/, '');
const root = resolve(import.meta.dirname, '..');

const chromeCandidates = [
  process.env.CHROME_PATH,
  'C:/Program Files/Google/Chrome/Application/chrome.exe',
  'C:/Program Files (x86)/Google/Chrome/Application/chrome.exe',
  '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
  '/usr/bin/google-chrome',
].filter(Boolean);
const chrome = chromeCandidates.find((path) => existsSync(path));
if (!chrome) throw new Error('Chrome not found; set CHROME_PATH.');

// A throwaway profile, so the user's own Chrome profile is never touched.
const profile = mkdtempSync(join(tmpdir(), 'mk-export-'));
const common = [
  '--headless=new',
  '--disable-gpu',
  '--hide-scrollbars',
  '--no-first-run',
  '--no-default-browser-check',
  '--blink-settings=preferredColorScheme=1',
  `--user-data-dir=${profile}`,
  '--virtual-time-budget=8000',
];

function run(args) {
  execFileSync(chrome, [...common, ...args], { stdio: 'ignore' });
}

mkdirSync(join(root, 'public/og'), { recursive: true });

try {
  for (const locale of ['en', 'nl']) {
    const prefix = locale === 'en' ? '' : '/nl';
    for (const variant of ['home', 'kaizen']) {
      const out = join(root, `public/og/${variant}-${locale}.png`);
      run(['--window-size=1200,630', `--screenshot=${out}`, `${base}${prefix}/og?variant=${variant}`]);
      console.log(`og   ${out}`);
    }
  }
} finally {
  rmSync(profile, { recursive: true, force: true });
}
