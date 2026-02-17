<script setup lang="ts">
import flag_nl from '~/assets/images/icons/flag_nl.svg';
import flag_en from '~/assets/images/icons/flag_en.svg';

const { t, locale, setLocale } = useI18n();
const localePath = useLocalePath();
const themeStore = useThemeStore();
const route = useRoute();

const alternateLocale = computed(() => (locale.value === 'en' ? 'nl' : 'en'));
const alternateFlag = computed(() => (locale.value === 'en' ? flag_nl : flag_en));
const switchLanguageLabel = computed(() =>
  t('navigation.toggle.switchTo', { value: t(`navigation.toggle.languages.${alternateLocale.value}`) })
);
const switchThemeLabel = computed(() =>
  t('navigation.toggle.switchTo', {
    value: t(`navigation.toggle.theme.${themeStore.theme === 'dark' ? 'light' : 'dark'}`),
  })
);

const isMobileMenuOpen = ref(false);
const toggleMobileMenu = () => {
  isMobileMenuOpen.value = !isMobileMenuOpen.value;
};
const closeMobileMenu = () => {
  isMobileMenuOpen.value = false;
};

const switchLanguage = () => {
  setLocale(locale.value === 'en' ? 'nl' : 'en');
};

watch(isMobileMenuOpen, (open) => {
  if (import.meta.client) {
    document.body.style.overflow = open ? 'hidden' : '';
  }
});

watch(
  () => route.fullPath,
  () => {
    isMobileMenuOpen.value = false;
  }
);
</script>

<template>
  <nav class="navbar-wrapper">
    <div class="navbar">
      <div class="nav-left">
        <NuxtLink
          :to="localePath('/')"
          class="navbar-logo"
        >
          <img
            :src="themeStore.logo"
            alt="Logo"
            class="logo"
          />
        </NuxtLink>
      </div>
      <div class="nav-right">
        <!-- Mobile menu button -->
        <div
          class="mobile-menu-button"
          @click="toggleMobileMenu"
          :aria-expanded="isMobileMenuOpen"
          aria-label="Toggle navigation menu"
        >
          <span class="material-symbols-outlined">{{ isMobileMenuOpen ? 'close' : 'menu' }}</span>
        </div>

        <!-- Desktop navigation -->
        <div class="nav-items desktop-nav">
          <NuxtLink
            :to="localePath('/')"
            class="nav-item"
            active-class=""
            exact-active-class="router-link-active"
          >
            {{ t('navigation.home') }}
          </NuxtLink>
          <NuxtLink
            :to="localePath('/portfolio')"
            class="nav-item"
          >
            {{ t('navigation.portfolio') }}
          </NuxtLink>
          <NuxtLink
            :to="localePath('/contact')"
            class="nav-item"
          >
            {{ t('navigation.contact') }}
          </NuxtLink>
        </div>
        <div class="other-items desktop-nav">
          <button
            type="button"
            class="pill-button"
            :title="switchLanguageLabel"
            :aria-label="switchLanguageLabel"
            @click="switchLanguage"
          >
            <img
              :src="alternateFlag"
              :alt="t(`navigation.toggle.languages.${alternateLocale}`)"
              class="language-flag"
            />
          </button>
          <button
            type="button"
            class="pill-button"
            :title="switchThemeLabel"
            :aria-label="switchThemeLabel"
            @click="themeStore.toggleTheme()"
          >
            <span class="material-symbols-outlined theme-icon">{{ themeStore.icon }}</span>
          </button>
        </div>
      </div>
    </div>

    <!-- Mobile menu overlay -->
    <Transition name="mobile-menu">
      <div
        class="mobile-menu"
        v-if="isMobileMenuOpen"
      >
        <div class="mobile-nav-items">
          <NuxtLink
            :to="localePath('/')"
            class="nav-item"
            active-class=""
            exact-active-class="router-link-active"
            @click="closeMobileMenu"
          >
            {{ t('navigation.home') }}
          </NuxtLink>
          <NuxtLink
            :to="localePath('/portfolio')"
            class="nav-item"
            @click="closeMobileMenu"
          >
            {{ t('navigation.portfolio') }}
          </NuxtLink>
          <NuxtLink
            :to="localePath('/contact')"
            class="nav-item"
            @click="closeMobileMenu"
          >
            {{ t('navigation.contact') }}
          </NuxtLink>

          <div class="mobile-other-items">
            <button
              type="button"
              class="pill-button"
              :title="themeStore.theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'"
              :aria-label="themeStore.theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'"
              @click="themeStore.toggleTheme()"
            >
              <span class="material-symbols-outlined theme-icon">{{ themeStore.icon }}</span>
            </button>
            <button
              type="button"
              class="pill-button"
              :title="switchLanguageLabel"
              :aria-label="switchLanguageLabel"
              @click="switchLanguage"
            >
              <img
                :src="alternateFlag"
                :alt="t(`navigation.toggle.languages.${alternateLocale}`)"
                class="language-flag"
              />
            </button>
          </div>
        </div>
      </div>
    </Transition>
  </nav>
</template>

<style scoped>
/* Default styles: Mobile first */
.navbar-wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  position: relative;
}

.navbar {
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.nav-left {
  display: flex;
  align-items: center;
}

.navbar-logo {
  display: flex;
  transition: transform 150ms ease;
}

.navbar-logo:hover {
  transform: scale(1.05);
}

.logo {
  height: 1.75rem;
}

.nav-right {
  display: flex;
  align-items: center;
  gap: 0.625rem;
}

.mobile-menu-button {
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  z-index: 20;
}

.mobile-menu-button span {
  font-size: 2rem;
}

/* Desktop nav - hidden on mobile */
.nav-items.desktop-nav,
.other-items.desktop-nav {
  display: none;
}

/* Nav items pill container */
.nav-items {
  display: flex;
  gap: 0.3125rem;
  padding: 0.3125rem;
  border-radius: 1.875rem;
  background-color: rgb(from var(--primary) r g b / 0.2);
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
}

.nav-item {
  text-decoration: none;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0.3125rem 0.625rem;
  border-radius: 1.875rem;
  color: var(--text);
  transition:
    background-color 0.3s ease,
    color 0.3s ease;
}

.nav-item:hover {
  background-color: rgb(from var(--primary) r g b / 0.3);
}

.nav-item.router-link-active {
  background-color: var(--primary);
  color: var(--button-primary-text);
}

/* Other items (language + theme) */
.other-items {
  display: flex;
  align-items: center;
  gap: 0.625rem;
}

.pill-button {
  background: none;
  border: none;
  cursor: pointer;
  color: inherit;
  border-radius: 1.875rem;
  background-color: rgb(from var(--primary) r g b / 0.2);
  padding: 0.625rem;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  transition: background-color 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
}

.pill-button:hover {
  background-color: rgb(from var(--primary) r g b / 0.3);
}

.theme-icon {
  height: 24px;
  transition: color 0.3s ease;
}

.language-flag {
  width: 24px;
  height: 24px;
  border-radius: 50%;
}

/* Mobile menu overlay */
.mobile-menu {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: var(--background);
  z-index: 10;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.mobile-nav-items {
  display: flex;
  flex-direction: column;
  gap: 0.9375rem;
  align-items: center;
}

.mobile-nav-items .nav-item {
  font-size: 1.2rem;
  padding: 0.625rem 1.25rem;
}

.mobile-other-items {
  margin-top: 0.9375rem;
  display: flex;
  gap: 0.625rem;
}

/* Mobile menu transition */
.mobile-menu-enter-from,
.mobile-menu-leave-to {
  opacity: 0;
  transform: translateY(-20px);
}

.mobile-menu-enter-active,
.mobile-menu-leave-active {
  transition:
    opacity 0.3s ease,
    transform 0.3s ease;
}

.mobile-menu-enter-to,
.mobile-menu-leave-from {
  opacity: 1;
  transform: translateY(0);
}

/* Small Devices */
@media screen and (min-width: 576px) {
  .logo {
    height: 2.5rem;
  }
}

/* Large Devices */
@media screen and (min-width: 992px) {
  .mobile-menu-button {
    display: none;
  }

  .nav-items.desktop-nav,
  .other-items.desktop-nav {
    display: flex;
    align-items: center;
    gap: 0.625rem;
  }

  .mobile-menu {
    display: none !important;
  }
}
</style>
