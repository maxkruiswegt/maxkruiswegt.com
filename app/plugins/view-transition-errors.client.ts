// Nuxt's view-transition plugin only catches `finished`. When a transition is skipped (the tab
// is hidden mid-navigation, or a second navigation interrupts it), `ready` and
// `updateCallbackDone` reject too and surface as uncaught errors. The navigation itself is fine.
export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.hook('page:view-transition:start', (transition) => {
    transition.ready.catch(() => {});
    transition.updateCallbackDone.catch(() => {});
  });
});
