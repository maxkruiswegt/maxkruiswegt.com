<script setup lang="ts">
import { site } from '~/data/site';

const { t } = useI18n();
</script>

<template>
  <section
    id="contact"
    class="section contact"
    aria-labelledby="contact-title"
  >
    <div class="container inner">
      <h2 id="contact-title">{{ t('contact.heading') }}</h2>
      <p class="body">{{ t('contact.body') }}</p>
      <p class="email-row">
        <a
          :href="`mailto:${site.email}`"
          class="email"
          >{{ site.email }}</a
        >
        <CopyButton :value="site.email" />
      </p>
      <ul
        role="list"
        class="links"
      >
        <li>
          <a
            :href="site.linkedin"
            target="_blank"
            rel="me noopener"
            class="text-link"
          >
            LinkedIn <AppIcon name="arrow-up-right" />
            <span class="visually-hidden">{{ t('a11y.newTab') }}</span>
          </a>
        </li>
        <li>
          <a
            :href="site.github"
            target="_blank"
            rel="me noopener"
            class="text-link"
          >
            GitHub <AppIcon name="arrow-up-right" />
            <span class="visually-hidden">{{ t('a11y.newTab') }}</span>
          </a>
        </li>
      </ul>
    </div>
  </section>
</template>

<style scoped>
.inner {
  display: grid;
  gap: var(--space-s);
  justify-items: start;
}

.body {
  font-size: var(--step-1);
  line-height: 1.45;
  max-width: 40rem;
  color: var(--muted);
}

.email-row {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: var(--space-xs) var(--space-m);
  margin-top: var(--space-xs);
}

/* Capped by viewport width so the address always fits on one line on a phone. */
.email {
  font-family: var(--font-display);
  font-size: min(var(--step-4), 7.6vw);
  line-height: 1.1;
  color: var(--text);
  text-decoration-thickness: 1px;
  text-underline-offset: 0.12em;
  white-space: nowrap;
}

.contact {
  padding-bottom: var(--space-2xl);
}

.email:hover {
  color: var(--accent);
}

.links {
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-2xs) var(--space-l);
  margin-top: var(--space-xs);
}

.links a {
  min-height: 2.75rem;
}
</style>
