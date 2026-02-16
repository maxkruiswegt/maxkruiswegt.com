<script setup lang="ts">
import flag_nl from '~/assets/images/icons/flag_nl.svg';
import flag_en from '~/assets/images/icons/flag_en.svg';

const { t, locale, setLocale } = useI18n();
const localePath = useLocalePath();
const themeStore = useThemeStore();
const route = useRoute();

const isMenuOpen = ref(false);
const toggleMenu = () => {
  isMenuOpen.value = !isMenuOpen.value;
};

const isDropdownOpen = ref(false);
const toggleDropdown = () => {
  isDropdownOpen.value = !isDropdownOpen.value;
};

const mkDevelopmentUrl = useMkDevelopmentUrl();

const changeLanguage = (lang: 'en' | 'nl') => {
  isDropdownOpen.value = false;
  setLocale(lang);
};

const closeDropdown = () => {
  isDropdownOpen.value = false;
};

watch(
  () => route.fullPath,
  () => {
    isMenuOpen.value = false;
    isDropdownOpen.value = false;
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
          <div class="language-dropdown">
            <button
              type="button"
              class="language-icon-button"
              :aria-expanded="isDropdownOpen"
              aria-haspopup="true"
              :aria-label="t('languages.' + locale)"
              @click="toggleDropdown"
            >
              <img
                :src="locale === 'nl' ? flag_nl : flag_en"
                alt=""
                class="language-icon"
              />
            </button>
            <div
              class="dropdown-menu"
              v-if="isDropdownOpen"
            >
              <button
                type="button"
                class="dropdown-item"
                @click="changeLanguage('nl')"
              >
                <img
                  :src="flag_nl"
                  alt=""
                />
                <span>{{ t('languages.nl') }}</span>
              </button>
              <button
                type="button"
                class="dropdown-item"
                @click="changeLanguage('en')"
              >
                <img
                  :src="flag_en"
                  alt=""
                />
                <span>{{ t('languages.en') }}</span>
              </button>
            </div>
          </div>
          <button
            type="button"
            class="theme-icon-button"
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
          <button
            type="button"
            class="theme-icon-button"
            :aria-label="themeStore.theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'"
            @click="themeStore.toggleTheme()"
          >
            <span class="material-symbols-outlined theme-icon">{{ themeStore.icon }}</span>
          </button>
          <div class="language-dropdown">
            <button
              type="button"
              class="language-icon-button"
              :aria-expanded="isDropdownOpen"
              aria-haspopup="true"
              :aria-label="t('languages.' + locale)"
              @click="toggleDropdown"
            >
              <img
                :src="locale === 'nl' ? flag_nl : flag_en"
                alt=""
                class="language-icon"
              />
            </button>
            <div
              class="dropdown-menu"
              v-if="isDropdownOpen"
            >
              <button
                type="button"
                class="dropdown-item"
                @click="changeLanguage('nl')"
              >
                <img
                  :src="flag_nl"
                  alt=""
                />
                <span>{{ t('languages.nl') }}</span>
              </button>
              <button
                type="button"
                class="dropdown-item"
                @click="changeLanguage('en')"
              >
                <img
                  :src="flag_en"
                  alt=""
                />
                <span>{{ t('languages.en') }}</span>
              </button>
            </div>
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
      <div
        v-if="isDropdownOpen"
        class="mask"
        @click="closeDropdown"
      ></div>
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
  transform: scale(1.025);
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
.language-icon-button {
  background: none;
  border: none;
  padding: 0;
  cursor: pointer;
  display: flex;
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
  transition:
    color 150ms ease,
    transform 150ms ease;

  span {
    font-size: 1.333rem;
  }
}

.navlink:hover {
  color: var(--primary);
  transform: scale(1.025);
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

/* Language dropdown */
.language-dropdown {
  display: flex;
  position: relative;
}

.language-icon {
  cursor: pointer;
  width: 24px;
  height: 24px;
}

.dropdown-menu {
  position: absolute;
  top: 100%;
  right: 0;
  background: var(--text);
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  z-index: 1000;
  border-radius: 0.5rem;
}

.dropdown-item {
  display: flex;
  align-items: center;
  padding: 0.5rem 1rem;
  cursor: pointer;
  color: var(--background);
  background: none;
  border: none;
  width: 100%;
  font: inherit;

  &:first-child {
    border-top-left-radius: 0.5rem;
    border-top-right-radius: 0.5rem;
  }
  &:last-child {
    border-bottom-left-radius: 0.5rem;
    border-bottom-right-radius: 0.5rem;
  }
}

.dropdown-item {
  transition: background-color 150ms ease;
}

.dropdown-item:hover {
  background-color: var(--text-30);
}

.dropdown-item img {
  width: 20px;
  height: 20px;
  margin-right: 0.5rem;
}

.mask {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: transparent;
  z-index: 999;
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
