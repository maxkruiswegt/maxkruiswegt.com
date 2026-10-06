<script setup lang="ts">
import { experience } from '~/data/experience';

const { t } = useI18n();
const { pick, monthYear } = useLocalized();
</script>

<template>
  <section
    id="experience"
    class="section"
    aria-labelledby="experience-title"
  >
    <div class="container">
      <header class="section-head">
        <h2 id="experience-title">{{ t('experience.heading') }}</h2>
      </header>

      <!-- A timeline from the oldest role to now: vertical on phones, left to right on wide screens. -->
      <ol
        role="list"
        class="timeline"
      >
        <li
          v-for="entry in experience"
          :key="entry.id"
          class="entry reveal"
          :class="{ current: !entry.end }"
        >
          <p class="when small">
            <time :datetime="entry.start">{{ monthYear(entry.start) }}</time>
            <span aria-hidden="true"> – </span>
            <!-- Spaces inside the string: Vue drops whitespace-only text at the edges of an element. -->
            <span class="visually-hidden">{{ ` ${t('experience.until')} ` }}</span>
            <time
              v-if="entry.end"
              :datetime="entry.end"
              >{{ monthYear(entry.end) }}</time
            >
            <span v-else>{{ t('experience.present') }}</span>
          </p>
          <h3>{{ pick(entry.role) }}</h3>
          <p class="place">{{ entry.place }}</p>
          <p class="note">{{ pick(entry.note) }}</p>
        </li>
      </ol>
    </div>
  </section>
</template>

<style scoped>
.timeline {
  --dot: 0.75rem;
  position: relative;
  display: grid;
  gap: var(--space-l);
}

/* The rail: a quiet line through the dots. */
.timeline::before,
.timeline::after {
  content: '';
  position: absolute;
  left: calc(var(--dot) / 2 - 0.5px);
  top: 0.5rem;
  bottom: 0.5rem;
  width: 1px;
  background: var(--border-strong);
}

.timeline::after {
  display: none;
  background: var(--accent);
}

.entry {
  position: relative;
  display: grid;
  gap: 0.2rem;
  align-content: start;
  padding-left: calc(var(--dot) + var(--space-s));
}

/* One dot per role; the current one is filled. */
.entry::before {
  content: '';
  position: absolute;
  z-index: 1;
  left: 0;
  top: 0.3rem;
  width: var(--dot);
  height: var(--dot);
  border: 2px solid var(--accent);
  border-radius: 50%;
  background: var(--bg);
}

.entry.current::before {
  background: var(--accent);
}

.when {
  color: var(--muted);
  margin-bottom: var(--space-3xs);
}

h3 {
  font-size: var(--step-0);
}

.place {
  color: var(--muted);
}

.note {
  margin-top: var(--space-2xs);
  max-width: var(--measure);
}

@media (min-width: 56rem) {
  .timeline {
    grid-template-columns: repeat(4, minmax(0, 1fr));
  }

  .timeline::before,
  .timeline::after {
    left: 0;
    right: 0;
    top: calc(var(--dot) / 2 - 0.5px);
    bottom: auto;
    width: auto;
    height: 1px;
  }

  .entry {
    padding-left: 0;
    padding-top: calc(var(--dot) + var(--space-s));
  }

  .entry::before {
    top: 0;
  }
}

/* The accent line draws itself along the rail as the timeline scrolls into view. Progressive
   enhancement: without support, or with reduced motion, only the quiet rail is there. */
@media (prefers-reduced-motion: no-preference) {
  @supports (animation-timeline: view()) {
    .timeline::after {
      display: block;
      transform-origin: top;
      animation: draw-down linear both;
      animation-timeline: view();
      animation-range: entry 20% cover 60%;
    }

    @media (min-width: 56rem) {
      .timeline::after {
        transform-origin: left;
        animation-name: draw-across;
        animation-range: entry 40% cover 50%;
      }
    }
  }
}

@keyframes draw-down {
  from {
    transform: scaleY(0);
  }
}

@keyframes draw-across {
  from {
    transform: scaleX(0);
  }
}
</style>
