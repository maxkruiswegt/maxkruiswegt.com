// Remembers where the visitor was reading when they switch language, so the other language opens
// at the same place instead of at the top. Set by LangSwitch on click, read once by the router's
// scroll behaviour after the new page has rendered.
//
// Both languages have the same structure, so the place is stored by landmarks (sections and
// headings, by index) instead of pixels: the nearest landmark above the reading line, and how far
// the line is towards the next one. Text lengths differ between the languages, so that fraction
// carries over better than a pixel offset.

const LANDMARKS = 'main :is(section, h2, h3)';

interface Place {
  above: number;
  below?: number;
  progress: number;
  offset: number;
}

let switching = false;
let place: Place | undefined;

const landmarks = () => [...document.querySelectorAll<HTMLElement>(LANDMARKS)];
// The top of the visible page: the bottom edge of the sticky header.
const readingLine = () => document.querySelector('.site-header')?.getBoundingClientRect().bottom ?? 0;

export function rememberSectionInView() {
  switching = true;
  place = undefined;
  if (window.scrollY < 1) return;
  const line = readingLine();
  const tops = landmarks().map((el) => el.getBoundingClientRect().top);
  // Nearest above and nearest below the line, by position (columns can put later elements higher).
  let above = -1;
  let below = -1;
  tops.forEach((top, i) => {
    if (top <= line && (above === -1 || top > tops[above]!)) above = i;
    if (top > line && (below === -1 || top < tops[below]!)) below = i;
  });
  if (above === -1) return;
  const aboveTop = tops[above]!;
  place =
    below === -1
      ? { above, progress: 0, offset: aboveTop }
      : { above, below, progress: (line - aboveTop) / (tops[below]! - aboveTop), offset: aboveTop };
}

/** True from the click on the language link until the new page has taken its position. */
export const isSwitchingLanguage = () => switching;

export function takeLanguageSwitchPosition() {
  const current = place;
  switching = false;
  place = undefined;
  if (!current) return undefined;
  const els = landmarks();
  const above = els[current.above];
  if (!above) return undefined;
  const aboveTop = above.getBoundingClientRect().top + window.scrollY;
  const below = current.below === undefined ? undefined : els[current.below];
  if (!below) return { left: 0, top: aboveTop - current.offset };
  const belowTop = below.getBoundingClientRect().top + window.scrollY;
  return { left: 0, top: aboveTop + current.progress * (belowTop - aboveTop) - readingLine() };
}
