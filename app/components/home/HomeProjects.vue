<script setup lang="ts">
import { sideProjects } from '~/data/projects';

const { t } = useI18n();
const { pick } = useLocalized();
</script>

<template>
  <section
    id="projects"
    class="section compact"
    aria-labelledby="projects-title"
  >
    <div class="container">
      <header class="section-head">
        <h2 id="projects-title">{{ t('projects.heading') }}</h2>
      </header>

      <ul
        role="list"
        class="projects"
      >
        <li
          v-for="project in sideProjects"
          :key="project.id"
          class="project reveal"
        >
          <div class="title">
            <img
              :src="project.icon"
              width="40"
              height="40"
              alt=""
              loading="lazy"
              class="icon"
            />
            <h3>
              <a
                v-if="project.href"
                :href="project.href"
                target="_blank"
                rel="noopener"
                class="text-link"
              >
                {{ project.name }}
                <AppIcon name="arrow-up-right" />
                <span class="visually-hidden">{{ t('a11y.newTab') }}</span>
              </a>
              <template v-else>{{ project.name }}</template>
            </h3>
          </div>
          <p>{{ pick(project.line) }}</p>
          <p class="small muted">
            {{ project.stack }} ·
            <span class="num"
              >{{ project.start }}<span aria-hidden="true">–</span
              ><span class="visually-hidden">{{ ` ${t('experience.until')} ` }}</span
              >{{ project.end ?? t('experience.present') }}</span
            >
          </p>
        </li>
      </ul>
    </div>
  </section>
</template>

<style scoped>
.projects {
  display: grid;
  gap: var(--space-l);
}

.project {
  display: grid;
  gap: 0.4rem;
  align-content: start;
}

/* Same arrangement as the Kaizen heading: the icon centred on the name's letters. */
.title {
  display: flex;
  align-items: center;
  gap: var(--space-2xs);
  margin-bottom: var(--space-3xs);
}

/* App icons keep their own colours in both themes, like Kaizen's. In dark mode a hairline ring keeps
   a dark icon from melting into the page (--icon-ring is transparent in light mode). */
.icon {
  flex: none;
  width: 2.5rem;
  height: 2.5rem;
  border-radius: 50%;
  box-shadow: 0 0 0 1px var(--icon-ring);
}

h3 {
  font-size: var(--step-1);
  text-box: trim-both cap alphabetic;
}

h3 a {
  color: var(--text);
  text-decoration: none;
}

h3 a:hover {
  color: var(--accent);
}

@media (min-width: 48rem) {
  .projects {
    grid-template-columns: repeat(2, minmax(0, 1fr));
    max-width: 54rem;
  }
}
</style>
