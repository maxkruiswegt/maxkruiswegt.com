<script setup lang="ts">
import { site } from '~/data/site';

const year = new Date(`${site.updated}T00:00:00Z`).getUTCFullYear();
</script>

<template>
  <footer class="site-footer">
    <div class="container inner">
      <span>© {{ year }} Max Kruiswegt</span>
      <div class="links">
        <a
          :href="site.linkedin"
          rel="me noopener"
          target="_blank"
          >LinkedIn</a
        >
        <a
          :href="site.github"
          rel="me noopener"
          target="_blank"
          >GitHub</a
        >
        <LangSwitch long />
      </div>
    </div>
  </footer>
</template>

<style scoped>
.site-footer {
  border-top: 1px solid var(--border);
  padding-block: var(--space-l) var(--space-xl);
  color: var(--muted);
  font-size: var(--step--1);
}

.inner {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: center;
  gap: var(--space-s) var(--space-m);
}

.links {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: var(--space-2xs) var(--space-m);
}

.links a {
  color: var(--muted);
}

.links a:hover {
  color: var(--text);
}

.links :deep(.lang-switch) {
  min-height: 0;
  min-width: 0;
  padding: 0;
  font-size: inherit;
  font-weight: 400;
  letter-spacing: 0;
  color: var(--muted);
  text-decoration: underline;
  text-decoration-thickness: 1px;
  text-underline-offset: 0.2em;
}
</style>
