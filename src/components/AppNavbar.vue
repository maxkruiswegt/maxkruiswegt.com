<script setup>
import { ref } from 'vue';
import { useThemeStore } from '@/stores/ThemeStore';
import { useI18n } from 'vue-i18n';

const { t, locale } = useI18n();

const themeStore = useThemeStore();

const isMenuOpen = ref(false);
const toggleMenu = () => {
  isMenuOpen.value = !isMenuOpen.value;
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
            <p>Home</p>
          </RouterLink>
          <RouterLink
            :to="{ name: `portfolio_${locale}` }"
            class="navlink"
          >
            <span class="material-symbols-outlined">work</span>
            <p>Portfolio</p>
          </RouterLink>
          <RouterLink
            :to="{ name: `contact_${locale}` }"
            class="navlink"
          >
            <span class="material-symbols-outlined">help</span>
            <p>Contact</p>
          </RouterLink>
          <span
            class="material-symbols-outlined theme-icon"
            @click="themeStore.toggleTheme()"
            >{{ themeStore.icon }}</span
          >
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
            <p>Home</p>
          </RouterLink>
          <RouterLink
            :to="{ name: `portfolio_${locale}` }"
            class="navlink-mobile"
          >
            <span class="material-symbols-outlined">work</span>
            <p>Portfolio</p>
          </RouterLink>
          <RouterLink
            :to="{ name: `contact_${locale}` }"
            class="navlink-mobile"
          >
            <span class="material-symbols-outlined">help</span>
            <p>Contact</p>
          </RouterLink>
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
  max-width: 1280px;
  padding: 1rem;
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
  transform: scale(1.05);
}

.logo {
  height: 2rem;
}

.navbar-actions {
  display: flex;
  align-items: center;
  gap: 1.5rem;
}

.theme-icon,
.menu-icon {
  cursor: pointer;
  font-size: 1.777rem;
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
  transform: scale(1.05);
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
  .navbar {
    padding: 2rem;
  }

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
