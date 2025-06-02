<script setup>
import { ref, computed } from 'vue';
import { useThemeStore } from '@/stores/ThemeStore';
import { useI18n } from 'vue-i18n';

/* icons */
import flag_nl from '@/assets/images/icons/flag_nl.svg';
import flag_en from '@/assets/images/icons/flag_en.svg';

const { t, locale } = useI18n();

const themeStore = useThemeStore();

const isMenuOpen = ref(false);
const toggleMenu = () => {
  isMenuOpen.value = !isMenuOpen.value;
};

const isDropdownOpen = ref(false);
const toggleDropdown = () => {
  isDropdownOpen.value = !isDropdownOpen.value;
};

const mkDevelopmentUrl = computed(() => {
  return locale.value === 'nl' ? 'https://mkdevelopment.nl' : 'https://mkdevelopment.nl/en';
});

const changeLanguage = (lang) => {
  const currentPath = window.location.pathname;
  const newPath =
    lang === 'nl'
      ? currentPath.startsWith('/nl')
        ? currentPath
        : '/nl' + currentPath
      : currentPath.startsWith('/nl')
      ? currentPath.substring(3)
      : currentPath;

  if (currentPath !== newPath) {
    window.location.pathname = newPath;
  }
};

const closeDropdown = () => {
  isDropdownOpen.value = false;
};
</script>

<template>
  <nav class="navbar-wrapper">
    <div class="navbar">
      <div class="navbar-content">
        <RouterLink
          :to="{ name: `home_${locale}` }"
          class="navbar-logo"
        >
          <img
            :src="themeStore.logo"
            alt="Logo"
            class="logo"
          />
        </RouterLink>
        <div class="navbar-actions">
          <div class="language-dropdown">
            <img
              :src="locale === 'nl' ? flag_nl : flag_en"
              alt="Language Flag"
              class="language-icon"
              @click="toggleDropdown"
            />
            <div
              class="dropdown-menu"
              v-if="isDropdownOpen"
            >
              <div
                class="dropdown-item"
                @click="changeLanguage('nl')"
              >
                <img
                  :src="flag_nl"
                  alt="Dutch"
                />
                <span>{{ t('languages.nl') }}</span>
              </div>
              <div
                class="dropdown-item"
                @click="changeLanguage('en')"
              >
                <img
                  :src="flag_en"
                  alt="English"
                />
                <span>{{ t('languages.en') }}</span>
              </div>
            </div>
          </div>
          <span
            class="material-symbols-outlined theme-icon"
            @click="themeStore.toggleTheme()"
            >{{ themeStore.icon }}</span
          >
          <span
            @click="toggleMenu"
            class="material-symbols-outlined menu-icon"
            >menu</span
          >
        </div>
        <div class="navbar-links">
          <RouterLink
            :to="{ name: `home_${locale}` }"
            class="navlink"
          >
            <span class="material-symbols-outlined">home</span>
            <p>{{ t('navigation.home') }}</p>
          </RouterLink>
          <RouterLink
            :to="{ name: `portfolio_${locale}` }"
            class="navlink"
          >
            <span class="material-symbols-outlined">work</span>
            <p>{{ t('navigation.portfolio') }}</p>
          </RouterLink>
          <RouterLink
            :to="{ name: `contact_${locale}` }"
            class="navlink"
          >
            <span class="material-symbols-outlined">help</span>
            <p>{{ t('navigation.contact') }}</p>
          </RouterLink>
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
          <span
            class="material-symbols-outlined theme-icon"
            @click="themeStore.toggleTheme()"
            >{{ themeStore.icon }}</span
          >
          <div class="language-dropdown">
            <img
              :src="locale === 'nl' ? flag_nl : flag_en"
              alt="Language Flag"
              class="language-icon"
              @click="toggleDropdown"
            />
            <div
              class="dropdown-menu"
              v-if="isDropdownOpen"
            >
              <div
                class="dropdown-item"
                @click="changeLanguage('nl')"
              >
                <img
                  :src="flag_nl"
                  alt="Dutch"
                />
                <span>{{ t('languages.nl') }}</span>
              </div>
              <div
                class="dropdown-item"
                @click="changeLanguage('en')"
              >
                <img
                  :src="flag_en"
                  alt="English"
                />
                <span>{{ t('languages.en') }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div
        class="mobile-menu"
        v-if="isMenuOpen"
      >
        <div>
          <RouterLink
            :to="{ name: `home_${locale}` }"
            class="navlink-mobile"
          >
            <span class="material-symbols-outlined">home</span>
            <p>{{ t('navigation.home') }}</p>
          </RouterLink>
          <RouterLink
            :to="{ name: `portfolio_${locale}` }"
            class="navlink-mobile"
          >
            <span class="material-symbols-outlined">work</span>
            <p>{{ t('navigation.portfolio') }}</p>
          </RouterLink>
          <RouterLink
            :to="{ name: `contact_${locale}` }"
            class="navlink-mobile"
          >
            <span class="material-symbols-outlined">help</span>
            <p>{{ t('navigation.contact') }}</p>
          </RouterLink>
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
  transition: all 0.3s;
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

.theme-icon,
.menu-icon {
  cursor: pointer;
  height: 24px;
  transition: all 0.3s;
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
  transition: all 0.3s;

  span {
    font-size: 1.333rem;
  }
}

.navlink:hover {
  color: var(--primary);
  transform: scale(1.025);
}

.external-link-icon {
  font-size: 1rem;
  opacity: 0.6;
  margin-left: 0.25rem;
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

  &:first-child {
    border-top-left-radius: 0.5rem;
    border-top-right-radius: 0.5rem;
  }
  &:last-child {
    border-bottom-left-radius: 0.5rem;
    border-bottom-right-radius: 0.5rem;
  }
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

/* Medium Devices */
@media screen and (min-width: 768px) {
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

/* Extra Large Devices */
@media screen and (min-width: 1200px) {
}

/* Extra Extra Large Devices */
@media screen and (min-width: 1600px) {
}

/* Very Large Devices */
@media screen and (min-width: 2560px) {
}
</style>
