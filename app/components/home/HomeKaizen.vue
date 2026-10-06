<script setup lang="ts">
import { kaizenFigures, kaizenLinks } from '~/data/site';

const { t, tm, rt } = useI18n();
const localePath = useLocalePath();
const { number, longDate } = useLocalized();

const inside = computed(() => (tm('kaizen.inside') as unknown[]).map((item) => rt(item as never)));

// Both screenshots morph into the same pair in the case study hero, but each only while it is on
// screen: a morph from an off-screen (or not yet loaded) image would fly in from nowhere.
const timer = useTemplateRef('timer');
const room = useTemplateRef('room');
const timerInView = ref(false);
const roomInView = ref(false);
let observer: IntersectionObserver | undefined;

onMounted(() => {
  if (!timer.value || !room.value) return;
  observer = new IntersectionObserver((entries) => {
    for (const entry of entries) {
      if (entry.target === timer.value) timerInView.value = entry.isIntersecting;
      else roomInView.value = entry.isIntersecting;
    }
  });
  observer.observe(timer.value);
  observer.observe(room.value);
});

onBeforeUnmount(() => observer?.disconnect());
</script>

<template>
  <section
    id="kaizen"
    class="section kaizen"
    aria-labelledby="kaizen-title"
  >
    <div class="container">
      <header class="head">
        <div class="title">
          <img
            src="/images/kaizen/icon.webp"
            width="64"
            height="64"
            alt=""
            class="app-icon"
          />
          <h2 id="kaizen-title">{{ t('kaizen.heading') }}</h2>
        </div>
        <p class="lead">{{ t('kaizen.lead') }}</p>
      </header>

      <div class="layout">
        <div class="copy">
          <p class="story">{{ t('kaizen.story') }}</p>

          <p class="figures">
            <i18n-t
              keypath="kaizen.figures"
              scope="global"
            >
              <template #signups>
                <strong>{{ number(kaizenFigures.signups) }}</strong>
              </template>
              <template #hours>
                <strong>{{ number(kaizenFigures.focusHours) }}</strong>
              </template>
              <template #rating>
                <strong>{{ number(kaizenFigures.rating, { minimumFractionDigits: 1 }) }}</strong>
              </template>
            </i18n-t>
            <span class="source small muted">{{ t('kaizen.figuresSource', { date: longDate(kaizenFigures.asOf) }) }}</span>
          </p>

          <div class="inside">
            <h3>{{ t('kaizen.insideHeading') }}</h3>
            <ul>
              <li
                v-for="item in inside"
                :key="item"
              >
                {{ item }}
              </li>
            </ul>
          </div>

          <p class="links">
            <NuxtLink
              :to="localePath('/kaizen')"
              class="btn btn-primary"
            >
              {{ t('kaizen.caseStudyLink') }}
              <AppIcon name="arrow-right" />
            </NuxtLink>
            <a
              :href="kaizenLinks.site"
              class="text-link"
              target="_blank"
              rel="noopener"
            >
              {{ t('kaizen.visit') }}
              <AppIcon name="arrow-up-right" />
              <span class="visually-hidden">{{ t('a11y.newTab') }}</span>
            </a>
          </p>
        </div>

        <div class="phones">
          <img
            ref="timer"
            src="/images/kaizen/timer.webp"
            width="720"
            height="1560"
            :alt="t('kaizen.timerAlt')"
            loading="lazy"
            decoding="async"
            class="shot phone"
            :style="timerInView ? { viewTransitionName: 'kaizen-phone' } : undefined"
          />
          <img
            ref="room"
            src="/images/kaizen/room.webp"
            width="720"
            height="1560"
            :alt="t('kaizen.roomAlt')"
            loading="lazy"
            decoding="async"
            class="shot phone phone-second"
            :style="roomInView ? { viewTransitionName: 'kaizen-room' } : undefined"
          />
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
/* The whole section sits on Kaizen's wash, so it ends on a clean edge with the next one. */
.kaizen {
  background: var(--kaizen-wash);
}

.head {
  margin-bottom: var(--space-xl);
  max-width: 44rem;
}

/* The icon belongs to the name, so it sits beside the title, centred on the letters themselves
   (text-box trims the line box to cap height and baseline). The lead runs full width below. */
.title {
  display: flex;
  align-items: center;
  gap: var(--space-xs);
}

.title h2 {
  text-box: trim-both cap alphabetic;
}

.app-icon {
  flex: none;
  width: calc(var(--step-4) * 1.25);
  height: auto;
  border-radius: 22.5%;
}

.lead {
  margin-top: var(--space-s);
  font-size: var(--step-1);
  line-height: 1.45;
  color: var(--muted);
}

.layout {
  display: grid;
  gap: var(--space-xl);
}

.copy {
  display: grid;
  gap: var(--space-l);
  align-content: start;
  max-width: var(--measure);
}

.story {
  font-size: var(--step-0);
}

.figures {
  padding-left: var(--space-s);
  border-left: 2px solid var(--kaizen);
  font-size: var(--step-1);
  line-height: 1.5;
}

.figures strong {
  font-weight: 600;
  color: var(--kaizen-text);
}

.source {
  display: block;
  margin-top: var(--space-2xs);
}

.inside h3 {
  font-size: var(--step-0);
  margin-bottom: var(--space-2xs);
}

.inside ul {
  padding-left: 1.1em;
  display: grid;
  gap: 0.35em;
}

.inside li::marker {
  color: var(--kaizen-text);
}

.links {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: var(--space-xs) var(--space-m);
}

/* Side by side, the second one a little lower, so neither screen hides part of the other. */
.phones {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: var(--space-s);
  align-items: start;
  max-width: 34rem;
  margin-inline: auto;
  width: 100%;
}

.phone {
  --shot-radius: 9% / 4.2%;
  width: 100%;
}

.phone-second {
  margin-top: 16%;
}

@media (min-width: 64rem) {
  .layout {
    grid-template-columns: minmax(0, 1fr) minmax(0, 0.9fr);
    align-items: start;
  }
}
</style>
