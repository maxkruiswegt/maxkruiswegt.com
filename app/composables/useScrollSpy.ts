// Tracks which home-page section is on a line just above the middle of the viewport, for
// aria-current in the header. Clicks change the URL hash; scrolling never does (that would spam
// history).
// `aliases` maps a section without its own nav link to the link that covers it
// (side projects count as work), so the highlight doesn't drop out between linked sections.
export function useScrollSpy(ids: readonly string[], aliases: Record<string, string> = {}) {
  const active = ref<string>();
  let observer: IntersectionObserver | undefined;

  // The last section is often too short to reach the middle band, so the bottom of the page
  // counts as being on it.
  const onScroll = () => {
    const atBottom = window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 2;
    if (atBottom) active.value = ids.at(-1);
  };

  // Sections touching the line. The observer watches a zero-height band at 42.5% of the viewport,
  // so every crossing triggers an update; exactly on a boundary two touch it and the nearest wins.
  const inBand = new Set<Element>();

  const start = () => {
    observer?.disconnect();
    inBand.clear();
    // Every section is watched, not only the linked ones, so the highlight clears over the hero
    // instead of sticking to the last linked section.
    observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) inBand.add(entry.target);
          else inBand.delete(entry.target);
        }
        const line = window.innerHeight * 0.425;
        let nearest: Element | undefined;
        let distance = Infinity;
        for (const el of inBand) {
          const rect = el.getBoundingClientRect();
          const d = rect.top <= line && rect.bottom >= line ? 0 : Math.min(Math.abs(rect.top - line), Math.abs(rect.bottom - line));
          if (d < distance) {
            distance = d;
            nearest = el;
          }
        }
        if (!nearest) return;
        const id = aliases[nearest.id] ?? nearest.id;
        active.value = ids.includes(id) ? id : undefined;
      },
      { rootMargin: '-42.5% 0px -57.5% 0px' }
    );
    for (const el of document.querySelectorAll('main section')) observer.observe(el);
    window.addEventListener('scroll', onScroll, { passive: true });
  };

  const stop = () => {
    window.removeEventListener('scroll', onScroll);
    observer?.disconnect();
    observer = undefined;
    inBand.clear();
    active.value = undefined;
  };

  onBeforeUnmount(stop);

  return { active, start, stop };
}
