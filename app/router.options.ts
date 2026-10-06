import type { RouterConfig } from 'nuxt/schema';
import { START_LOCATION } from 'vue-router';
import { isSwitchingLanguage, takeLanguageSwitchPosition } from '~/utils/languageSwitchAnchor';

// Mirrors Nuxt's default scroll behaviour (header offset from scroll-padding-top, scrolling only
// once the new page has rendered) with these changes:
// - in-page section links scroll smoothly, unless the visitor prefers reduced motion
// - jumps to a section on another page are instant
// - after a jump, focus moves to the section, so keyboard and screen reader users continue there
// - switching language keeps the visitor at the same place on the page

const motionOk = () => window.matchMedia('(prefers-reduced-motion: no-preference)').matches;
const headerOffset = () => Number.parseFloat(getComputedStyle(document.documentElement).scrollPaddingTop) || 0;

function toSection(hash: string, behavior: ScrollBehavior) {
  let el: HTMLElement | null = null;
  try {
    el = document.querySelector<HTMLElement>(hash);
  } catch {
    // Not a valid selector, so not one of our sections.
  }
  if (!el) return null;
  // Links and buttons are focusable already; adding tabindex -1 would take them out of the tab order.
  if (el.tabIndex < 0 && !el.hasAttribute('tabindex')) el.setAttribute('tabindex', '-1');
  el.focus({ preventScroll: true });
  return { el, top: headerOffset(), behavior };
}

export default {
  scrollBehavior(to, from, savedPosition) {
    const nuxtApp = useNuxtApp();
    const router = useRouter();
    const samePage = to.path.replace(/\/$/, '') === from.path.replace(/\/$/, '');

    if (samePage) {
      // An unknown hash on the same page leaves the scroll position alone.
      if (to.hash) return toSection(to.hash, motionOk() ? 'smooth' : 'instant') ?? false;
      // From /#work back to / (the name in the header): go to the top.
      if (from.hash) return savedPosition ?? { left: 0, top: 0 };
      return false;
    }

    const position = () =>
      savedPosition ??
      takeLanguageSwitchPosition() ??
      (to.hash ? toSection(to.hash, 'instant') : null) ?? { left: 0, top: 0 };
    if (from === START_LOCATION) return position();

    // Another page: wait until it has rendered, so a restored position isn't clamped to the old
    // page's height, and drop the scroll if the visitor already navigated on.
    return new Promise((resolve) => {
      nuxtApp.hooks.hookOnce('page:loading:end', async () => {
        await nuxtApp['~transitionPromise'];
        // A language switch takes its place right away, before the new page is first painted, so
        // the top of the other language never flashes by.
        if (isSwitchingLanguage()) return resolve(position());
        requestAnimationFrame(() => resolve(router.currentRoute.value.fullPath === to.fullPath ? position() : false));
      });
    });
  },
} satisfies RouterConfig;
