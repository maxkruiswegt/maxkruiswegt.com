<script setup lang="ts">
import flag_nl from '~/assets/images/icons/flag_nl.svg';
import flag_en from '~/assets/images/icons/flag_en.svg';

const { t, locale, setLocale } = useI18n();
const localePath = useLocalePath();
const themeStore = useThemeStore();
const route = useRoute();

const alternateFlag = computed(() => (locale.value === 'en' ? flag_nl : flag_en));

const isMenuOpen = ref(false);
const toggleMenu = () => {
  isMenuOpen.value = !isMenuOpen.value;
};

const mkDevelopmentUrl = useMkDevelopmentUrl();

const switchLanguage = () => {
  setLocale(locale.value === 'en' ? 'nl' : 'en');
};

watch(
  () => route.fullPath,
  () => {
    isMenuOpen.value = false;
  }
);
</script>

<template>
  <nav class="navbar-wrapper">
    <div class="navbar">
      <div class="navbar-content">
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
        <div class="navbar-actions">
          <button
            type="button"
            class="language-toggle-button"
            :title="t('languages.switchTo')"
            :aria-label="t('languages.switchTo')"
            @click="switchLanguage"
          >
            <img
              :src="alternateFlag"
              :alt="t('languages.switchTo')"
              class="language-flag"
            />
          </button>
          <button
            type="button"
            class="theme-icon-button"
            :title="themeStore.theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'"
            :aria-label="themeStore.theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'"
            @click="themeStore.toggleTheme()"
          >
            <span class="material-symbols-outlined theme-icon">{{ themeStore.icon }}</span>
          </button>
          <button
            type="button"
            class="menu-icon-button"
            :aria-expanded="isMenuOpen"
            aria-label="Toggle navigation menu"
            @click="toggleMenu"
          >
            <span class="material-symbols-outlined menu-icon">menu</span>
          </button>
        </div>
        <div class="navbar-links">
          <NuxtLink
            :to="localePath('/')"
            class="navlink"
          >
            <span class="material-symbols-outlined">home</span>
            <p>{{ t('navigation.home') }}</p>
          </NuxtLink>
          <NuxtLink
            :to="localePath('/portfolio')"
            class="navlink"
          >
            <span class="material-symbols-outlined">work</span>
            <p>{{ t('navigation.portfolio') }}</p>
          </NuxtLink>
          <NuxtLink
            :to="localePath('/contact')"
            class="navlink"
          >
            <span class="material-symbols-outlined">help</span>
            <p>{{ t('navigation.contact') }}</p>
          </NuxtLink>
          <a
            :href="mkDevelopmentUrl"
            target="_blank"
            rel="noopener noreferrer"
            class="navlink"
          >
            <span class="material-symbols-outlined">business</span>
            <p>{{ t('navigation.business') }}</p>
            <span class="material-symbols-outlined external-link-icon">open_in_new</span>
          </a>
          <div class="navbar-utility">
            <button
              type="button"
              class="theme-icon-button"
              :title="themeStore.theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'"
              :aria-label="themeStore.theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'"
              @click="themeStore.toggleTheme()"
            >
              <span class="material-symbols-outlined theme-icon">{{ themeStore.icon }}</span>
            </button>
            <button
              type="button"
              class="language-toggle-button"
              :title="t('languages.switchTo')"
              :aria-label="t('languages.switchTo')"
              @click="switchLanguage"
            >
              <img
                :src="alternateFlag"
                :alt="t('languages.switchTo')"
                class="language-flag"
              />
            </button>
          </div>
        </div>
      </div>
      <div
        class="mobile-menu"
        v-if="isMenuOpen"
      >
        <div>
          <NuxtLink
            :to="localePath('/')"
            class="navlink-mobile"
          >
            <span class="material-symbols-outlined">home</span>
            <p>{{ t('navigation.home') }}</p>
          </NuxtLink>
          <NuxtLink
            :to="localePath('/portfolio')"
            class="navlink-mobile"
          >
            <span class="material-symbols-outlined">work</span>
            <p>{{ t('navigation.portfolio') }}</p>
          </NuxtLink>
          <NuxtLink
            :to="localePath('/contact')"
            class="navlink-mobile"
          >
            <span class="material-symbols-outlined">help</span>
            <p>{{ t('navigation.contact') }}</p>
          </NuxtLink>
          <a
            :href="mkDevelopmentUrl"
            target="_blank"
            rel="noopener noreferrer"
            class="navlink-mobile"
          >
            <span class="material-symbols-outlined">business</span>
            <p>{{ t('navigation.business') }}</p>
            <span class="material-symbols-outlined external-link-icon">open_in_new</span>
          </a>
        </div>
      </div>
    </div>
  </nav>
</template>

<style scoped>
/* Extra Small Devices (Less than 576px) */
.navbar-wrapper {
  display: flex;
  justify-content: center;
}

.navbar {
  width: 100%;
}

.navbar-content {
  display: flex;
  justify-content: space-between;
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

.navbar-actions {
  display: flex;
  align-items: center;
  gap: 1.5rem;
}

.theme-icon-button,
.menu-icon-button,
.language-toggle-button {
  background: none;
  border: none;
  padding: 0;
  cursor: pointer;
  display: flex;
  align-items: center;
  color: inherit;
}

.theme-icon,
.menu-icon {
  cursor: pointer;
  height: 24px;
  transition: color 150ms ease;
}

.navbar-links {
  display: none;
}

.mobile-menu {
  display: flex;
  justify-content: center;
  margin-top: 1.25rem;
}

.navlink {
  display: flex;
  align-items: center;
  gap: 0.375rem;
  transition: color 150ms ease;

  span {
    font-size: 1.333rem;
  }
}

.navlink:hover {
  color: var(--primary);
}

.external-link-icon {
  font-size: 0.875rem !important;
  opacity: 0.6;
}

.navlink-mobile {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.5rem 2rem;

  span {
    font-size: 1.333rem;
  }
}

/* Utility group (theme + language) */
.navbar-utility {
  display: flex;
  align-items: center;
  gap: 1.5rem;
}

.navbar-utility button {
  transition: transform 150ms ease;
}

.navbar-utility button:hover {
  transform: scale(1.05);
}

.language-flag {
  width: 24px;
  height: 24px;
}

/* Small Devices */
@media screen and (min-width: 576px) {
  .logo {
    height: 2.5rem;
  }
}

/* Large Devices*/
@media screen and (min-width: 992px) {
  .mobile-menu {
    display: none;
  }

  .navbar-actions {
    display: none;
  }

  .navbar-links {
    display: flex;
    gap: 2.5rem;
    align-items: center;
  }
}
</style>
