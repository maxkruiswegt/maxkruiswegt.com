import { isSwitchingLanguage } from '~/utils/languageSwitchAnchor';

// A language switch shows the same page in the other language, so there is nothing to morph. A view
// transition would also capture the new page before its scroll position is restored, and show the
// wrong part of it for a moment.
export default defineNuxtPlugin(() => {
  useRouter().beforeEach((to) => {
    if (isSwitchingLanguage()) to.meta.viewTransition = false;
  });
});
