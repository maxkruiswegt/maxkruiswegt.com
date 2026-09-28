<script setup lang="ts">
const { t } = useI18n();

useHead({ title: t('contact.title') });
</script>

<template>
  <div class="contact-container hidden-element">
    <div class="contact-header">
      <p class="contact-label">{{ t('contact.label') }}</p>
      <h1>{{ t('contact.title') }}</h1>
      <p class="contact-subtitle">{{ t('contact.subtitle') }}</p>
    </div>

    <div class="contact-methods">
      <div class="contact-method noise-texture">
        <span class="method-icon material-symbols-outlined">mail</span>
        <h2 class="method-title">{{ t('contact.methods.email.title') }}</h2>
        <p class="method-description">{{ t('contact.methods.email.description') }}</p>
        <a
          href="mailto:info@maxkruiswegt.com"
          class="method-link"
        >
          info@maxkruiswegt.com
        </a>
      </div>

      <div class="contact-method noise-texture">
        <span class="method-icon material-symbols-outlined">link</span>
        <h2 class="method-title">{{ t('contact.methods.linkedin.title') }}</h2>
        <p class="method-description">{{ t('contact.methods.linkedin.description') }}</p>
        <a
          href="https://www.linkedin.com/in/maxkruiswegt/"
          target="_blank"
          rel="noopener noreferrer"
          class="method-link"
        >
          LinkedIn
        </a>
      </div>
    </div>
  </div>
</template>

<style scoped>
.contact-container {
  width: 100%;
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.contact-header {
  text-align: center;
  margin-bottom: 2rem;
}

.contact-label {
  color: var(--primary);
  font-size: 0.875rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  margin-bottom: 0.5rem;
}

.contact-subtitle {
  color: var(--text-20);
  margin-top: 0.5rem;
  font-size: 1.125rem;
}

.contact-methods {
  display: grid;
  gap: 1.5rem;
}

.contact-method {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  text-align: center;
  gap: 1rem;
  padding: 2.5rem 1.5rem;
  background-color: var(--surface);
  border: 1px solid var(--background-10);
  border-radius: 0.75rem;
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.15);
}

.method-icon {
  width: 4.5rem;
  height: 4.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--primary);
  border: 2px solid var(--primary);
  border-radius: 50%;
  font-size: 2rem;
}

.method-title {
  color: var(--primary);
  font-size: 1.777rem;
}

.method-description {
  color: var(--text-20);
  font-size: 1rem;
  line-height: 1.5;
}

.method-link {
  display: inline-block;
  margin-top: 0.5rem;
  color: var(--primary);
  font-weight: 500;
  text-decoration: none;
  padding: 0.75rem 1.5rem;
  border-radius: 1.875rem;
  background-color: rgb(from var(--primary) r g b / 0.1);
  transition: background-color 150ms ease;
}

.method-link:hover {
  background-color: rgb(from var(--primary) r g b / 0.2);
}

/* Medium Devices */
@media screen and (min-width: 768px) {
  .contact-header {
    margin-bottom: 3rem;
  }

  .contact-methods {
    grid-template-columns: 1fr 1fr;
  }

  .contact-method {
    padding: 4rem 2rem;
  }
}
</style>
