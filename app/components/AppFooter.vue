<script setup lang="ts">
const { t, locale } = useI18n();
const localePath = useLocalePath();
const themeStore = useThemeStore();

const year = new Date().getFullYear();

const mkDevelopmentUrl = useMkDevelopmentUrl();
</script>

<template>
  <div class="footer-container">
    <div class="footer-content">
      <div class="footer-logo">
        <NuxtLink :to="localePath('/')">
          <img
            :src="themeStore.logo"
            class="footer-logo-img"
            alt="Max Kruiswegt Logo"
          />
        </NuxtLink>
        <p class="footer-description">{{ t('footer.description') }}</p>
      </div>
      <div class="footer-links">
        <div>
          <h2 class="footer-heading">{{ t('footer.pages') }}</h2>
          <ul class="footer-list">
            <li class="footer-list-item">
              <NuxtLink
                :to="localePath('/')"
                class="footer-link"
                >{{ t('navigation.home') }}</NuxtLink
              >
            </li>
            <li class="footer-list-item">
              <NuxtLink
                :to="localePath('/portfolio')"
                class="footer-link"
                >{{ t('navigation.portfolio') }}</NuxtLink
              >
            </li>
            <li class="footer-list-item">
              <NuxtLink
                :to="localePath('/contact')"
                class="footer-link"
                >{{ t('navigation.contact') }}</NuxtLink
              >
            </li>
            <li class="footer-list-item">
              <a
                :href="mkDevelopmentUrl"
                target="_blank"
                rel="noopener noreferrer"
                class="footer-link external-footer-link"
                >{{ t('navigation.business') }}
                <span class="material-symbols-outlined external-link-icon">open_in_new</span>
              </a>
            </li>
          </ul>
        </div>
        <div>
          <h2 class="footer-heading">{{ t('footer.information') }}</h2>
          <ul class="footer-info-list">
            <li class="footer-info-item">
              <span class="material-symbols-outlined">mail</span>
              <p>info@maxkruiswegt.com</p>
            </li>
            <li class="footer-info-item">
              <span class="material-symbols-outlined">work</span>
              <p>KvK: 89767810</p>
            </li>
            <li class="footer-info-item">
              <span class="material-symbols-outlined">paid</span>
              <p>{{ t('footer.vat') }}</p>
            </li>
          </ul>
        </div>
      </div>
    </div>
    <hr class="footer-divider" />
    <div class="footer-bottom">
      <span class="footer-copy">Max Kruiswegt ▸ 2023 - {{ year }}</span>
      <div class="footer-socials">
        <a
          href="https://discord.com/users/279268739994877953"
          target="_blank"
          rel="noopener noreferrer"
          class="footer-social-link"
        >
          <svg
            class="footer-social-icon"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            viewBox="0 0 21 16"
          >
            <path
              d="M16.942 1.556a16.3 16.3 0 0 0-4.126-1.3 12.04 12.04 0 0 0-.529 1.1 15.175 15.175 0 0 0-4.573 0 11.585 11.585 0 0 0-.535-1.1 16.274 16.274 0 0 0-4.129 1.3A17.392 17.392 0 0 0 .182 13.218a15.785 15.785 0 0 0 4.963 2.521c.41-.564.773-1.16 1.084-1.785a10.63 10.63 0 0 1-1.706-.83c.143-.106.283-.217.418-.33a11.664 11.664 0 0 0 10.118 0c.137.113.277.224.418.33-.544.328-1.116.606-1.71.832a12.52 12.52 0 0 0 1.084 1.785 16.46 16.46 0 0 0 5.064-2.595 17.286 17.286 0 0 0-2.973-11.59ZM6.678 10.813a1.941 1.941 0 0 1-1.8-2.045 1.93 1.93 0 0 1 1.8-2.047 1.919 1.919 0 0 1 1.8 2.047 1.93 1.93 0 0 1-1.8 2.045Zm6.644 0a1.94 1.94 0 0 1-1.8-2.045 1.93 1.93 0 0 1 1.8-2.047 1.918 1.918 0 0 1 1.8 2.047 1.93 1.93 0 0 1-1.8 2.045Z"
            />
          </svg>
          <span class="sr-only">Discord account</span>
        </a>
        <a
          href="https://github.com/maxkruiswegt"
          target="_blank"
          rel="noopener noreferrer"
          class="footer-social-link"
        >
          <svg
            class="footer-social-icon"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path
              fill-rule="evenodd"
              d="M10 .333A9.911 9.911 0 0 0 6.866 19.65c.5.092.678-.215.678-.477 0-.237-.01-1.017-.014-1.845-2.757.6-3.338-1.169-3.338-1.169a2.627 2.627 0 0 0-1.1-1.451c-.9-.615.07-.6.07-.6a2.084 2.084 0 0 1 1.518 1.021 2.11 2.11 0 0 0 2.884.823c.044-.503.268-.973.63-1.325-2.2-.25-4.516-1.1-4.516-4.9A3.832 3.832 0 0 1 4.7 7.068a3.56 3.56 0 0 1 .095-2.623s.832-.266 2.726 1.016a9.409 9.409 0 0 1 4.962 0c1.89-1.282 2.717-1.016 2.717-1.016.366.83.402 1.768.1 2.623a3.827 3.827 0 0 1 1.02 2.659c0 3.807-2.319 4.644-4.525 4.889a2.366 2.366 0 0 1 .673 1.834c0 1.326-.012 2.394-.012 2.72 0 .263.18.572.681.475A9.911 9.911 0 0 0 10 .333Z"
              clip-rule="evenodd"
            />
          </svg>
          <span class="sr-only">GitHub account</span>
        </a>
        <a
          href="https://open.spotify.com/user/maxkruiswegt"
          target="_blank"
          rel="noopener noreferrer"
          class="footer-social-link"
        >
          <svg
            class="footer-social-icon"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z"
            />
          </svg>
          <span class="sr-only">Spotify account</span>
        </a>
        <a
          href="https://www.linkedin.com/in/maxkruiswegt/"
          target="_blank"
          rel="noopener noreferrer"
          class="footer-social-link"
        >
          <svg
            class="footer-social-icon"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            viewBox="0 0 24 24"
          >
            <title>LinkedIn</title>
            <path
              d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"
            />
          </svg>
          <span class="sr-only">LinkedIn account</span>
        </a>
      </div>
    </div>
  </div>
</template>

<style scoped>
.footer-container {
  width: 100%;
}

.footer-logo {
  margin-bottom: 1.5rem;
}

.footer-logo-img {
  height: 2rem;
  margin-inline-end: 0.75rem;
}

.footer-description {
  color: var(--text-30);
  margin-top: 0.5rem;
  overflow-wrap: normal;
  word-break: normal;
}

.footer-links {
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

.footer-heading {
  margin-bottom: 1.5rem;
  font-size: 0.75rem;
  font-weight: 600;
  text-transform: uppercase;
}

.footer-list,
.footer-info-list {
  color: var(--text-30);
}

.footer-list-item:not(:last-child),
.footer-info-item:not(:last-child) {
  margin-bottom: 1rem;
}

.footer-link:hover {
  text-decoration: underline;
}

.footer-info-item {
  display: flex;
  gap: 0.5rem;
}

.footer-divider {
  margin: 1.5rem 0;
  border-color: var(--text-70);
}

.footer-bottom {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.footer-copy {
  font-size: 0.75rem;
  color: var(--text-40);
}

.footer-socials {
  display: flex;
  margin-top: 1rem;
  gap: 1.25rem;
}

.footer-social-link {
  color: var(--text-40);
}

.footer-social-link:hover {
  color: var(--text);
}

.footer-social-icon {
  width: 1rem;
  height: 1rem;
}

.external-footer-link {
  display: flex;
  align-items: center;
  gap: 0.25rem;
}

.external-link-icon {
  font-size: 0.875rem;
  opacity: 0.6;
}

/* Small Devices */
@media screen and (min-width: 576px) {
  .footer-links {
    gap: 1.5rem;
  }

  .footer-bottom {
    flex-direction: row;
    justify-content: space-between;
  }

  .footer-copy {
    text-align: center;
  }

  .footer-socials {
    justify-content: center;
    margin-top: 0;
  }
}

/* Medium Devices */
@media screen and (min-width: 768px) {
  .footer-content {
    display: flex;
    justify-content: space-between;
  }

  .footer-logo {
    margin-bottom: 0;
    width: 33.3%;
  }

  .footer-links {
    display: grid;
    grid-template-columns: 1fr 2fr;
  }
}

/* Large Devices */
@media screen and (min-width: 992px) {
  .footer-links {
    grid-template-columns: repeat(2, minmax(0, 1fr));
    padding-bottom: 0;
  }
}
</style>
