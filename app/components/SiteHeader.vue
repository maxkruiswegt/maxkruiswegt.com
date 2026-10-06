<script setup lang="ts">
const { t } = useI18n();
const localePath = useLocalePath();
const route = useRoute();
const nuxtApp = useNuxtApp();

const sections = ['kaizen', 'education', 'experience', 'work', 'contact'] as const;
const isHome = computed(() => route.path.replace(/\/$/, '') === localePath('/').replace(/\/$/, ''));

const spy = useScrollSpy(sections, { projects: 'work' });
const menuOpen = ref(false);
const menuButton = useTemplateRef('menuButton');

const syncSpy = () => (isHome.value ? spy.start() : spy.stop());
onMounted(syncSpy);
nuxtApp.hook('page:finish', syncSpy);

watch(
  () => route.fullPath,
  () => {
    menuOpen.value = false;
  }
);

// Escape closes the menu and puts focus back on the button, so it never stays on a hidden link.
function onKeydown(event: KeyboardEvent) {
  if (event.key !== 'Escape' || !menuOpen.value) return;
  menuOpen.value = false;
  menuButton.value?.focus();
}

// RouterLink marks every /#section link as the exact active page on the home route (it ignores the
// hash), so aria-current is set explicitly from the scroll position instead, on both menus.
const current = (id: string) => (isHome.value && spy.active.value === id ? 'location' : undefined);
</script>

<template>
  <header
    class="site-header"
    @keydown="onKeydown"
  >
    <div class="bar container">
      <NuxtLink
        :to="localePath('/')"
        class="brand"
        >Max Kruiswegt</NuxtLink
      >

      <nav
        class="nav-desktop"
        :aria-label="t('nav.label')"
      >
        <ul role="list">
          <li
            v-for="id in sections"
            :key="id"
          >
            <NuxtLink
              :to="{ path: localePath('/'), hash: `#${id}` }"
              :aria-current="current(id)"
              >{{ t(`nav.${id}`) }}</NuxtLink
            >
          </li>
        </ul>
      </nav>

      <div class="controls">
        <LangSwitch />
        <div class="theme-desktop">
          <ThemeSwitch />
        </div>
        <button
          ref="menuButton"
          type="button"
          class="menu-button"
          :aria-expanded="menuOpen"
          aria-controls="site-menu"
          @click="menuOpen = !menuOpen"
        >
          <AppIcon :name="menuOpen ? 'close' : 'menu'" />
          <span class="visually-hidden">{{ t('nav.menu') }}</span>
        </button>
      </div>
    </div>

    <div
      v-show="menuOpen"
      id="site-menu"
      class="menu-panel"
    >
      <nav
        class="container"
        :aria-label="t('nav.label')"
      >
        <ul role="list">
          <li
            v-for="id in sections"
            :key="id"
          >
            <NuxtLink
              :to="{ path: localePath('/'), hash: `#${id}` }"
              :aria-current="current(id)"
              @click="menuOpen = false"
              >{{ t(`nav.${id}`) }}</NuxtLink
            >
          </li>
        </ul>
        <div class="menu-theme">
          <span class="muted small">{{ t('theme.legend') }}</span>
          <ThemeSwitch />
        </div>
      </nav>
    </div>
  </header>
</template>

<style scoped>
.site-header {
  position: sticky;
  top: 0;
  z-index: 50;
  background: var(--bg);
  border-bottom: 1px solid var(--border);
}

/* The page reserves the header's height as scroll padding for jump targets. Things inside the
   header sit in that strip themselves, so without this, focusing one (clicking a theme option,
   tabbing to a link) makes the browser scroll the page to "reveal" it. */
.site-header :is(a, button, input) {
  scroll-margin-top: calc(-1 * (var(--header-h) + 1px));
}

.bar {
  display: flex;
  align-items: center;
  gap: var(--space-s);
  min-height: var(--header-h);
}

.brand {
  font-family: var(--font-display);
  font-size: var(--step-1);
  font-weight: 500;
  letter-spacing: -0.01em;
  color: var(--text);
  text-decoration: none;
  margin-right: auto;
  white-space: nowrap;
}

.nav-desktop {
  display: none;
}

.nav-desktop ul {
  display: flex;
  gap: var(--space-2xs);
}

.nav-desktop a,
.menu-panel a {
  color: var(--muted);
  text-decoration: none;
  font-weight: 500;
}

.nav-desktop a {
  display: inline-block;
  padding: 0.5rem 0.65rem;
  border-radius: var(--radius-s);
}

.nav-desktop a:hover,
.menu-panel a:hover {
  color: var(--text);
}

.nav-desktop a[aria-current] {
  color: var(--text);
  text-decoration: underline;
  text-decoration-color: var(--accent);
  text-decoration-thickness: 2px;
  text-underline-offset: 0.45em;
}

.controls {
  display: flex;
  align-items: center;
  gap: var(--space-3xs);
}

.theme-desktop {
  display: none;
}

.menu-button {
  display: grid;
  place-items: center;
  width: 2.75rem;
  height: 2.75rem;
  border-radius: var(--radius-s);
}

.menu-button svg {
  width: 1.4rem;
  height: 1.4rem;
}

/* Scrolls on its own when the viewport is short (landscape phones, 400% zoom). */
.menu-panel {
  max-height: calc(100dvh - var(--header-h));
  overflow-y: auto;
  overscroll-behavior: contain;
  border-top: 1px solid var(--border);
  background: var(--bg);
  padding-block: var(--space-s) var(--space-m);
}

.menu-panel ul {
  display: grid;
}

.menu-panel a {
  display: block;
  padding: 0.7rem 0;
  font-size: var(--step-1);
  color: var(--text);
  border-bottom: 1px solid var(--border);
}

.menu-theme {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: var(--space-s);
}

/* Same switch point as the hero: the full nav from 64rem, the menu button below it. */
@media (min-width: 64rem) {
  .nav-desktop,
  .theme-desktop {
    display: block;
  }

  .menu-button,
  .menu-panel {
    display: none !important;
  }
}
</style>
