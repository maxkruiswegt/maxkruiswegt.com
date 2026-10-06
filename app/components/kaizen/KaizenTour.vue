<script setup lang="ts">
const { t, tm, rt } = useI18n();

const images = ['timer', 'room', 'tasks', 'habits', 'block-screen', 'stats'] as const;

interface Step {
  title: string;
  body: string;
  alt: string;
}

const steps = computed<Step[]>(() =>
  (tm('caseStudy.tour') as Record<keyof Step, unknown>[]).map((step) => ({
    title: rt(step.title as never),
    body: rt(step.body as never),
    alt: rt(step.alt as never),
  }))
);

// On wide screens one phone stays in view while the steps scroll past it; the step on the middle
// line of the viewport decides which screenshot it shows. Without JS the first one simply stays.
const active = ref(0);
const stepEls = ref<HTMLElement[]>([]);
let observer: IntersectionObserver | undefined;

// The step on the viewport's middle line is the current one. The observer watches that line (a
// zero-height band), so every crossing triggers an update; exactly on a boundary two steps touch
// it, and the one whose centre is nearest wins.
const inBand = new Map<number, Element>();

onMounted(() => {
  observer = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        const index = Number((entry.target as HTMLElement).dataset.index);
        if (entry.isIntersecting) inBand.set(index, entry.target);
        else inBand.delete(index);
      }
      const middle = window.innerHeight / 2;
      let nearest: number | undefined;
      let distance = Infinity;
      for (const [index, el] of inBand) {
        const rect = el.getBoundingClientRect();
        const d = Math.abs(rect.top + rect.height / 2 - middle);
        if (d < distance) {
          distance = d;
          nearest = index;
        }
      }
      if (nearest !== undefined) active.value = nearest;
    },
    { rootMargin: '-50% 0px -50% 0px' }
  );
  for (const el of stepEls.value) observer.observe(el);
});

onBeforeUnmount(() => observer?.disconnect());
</script>

<template>
  <section
    class="tour container"
    aria-labelledby="tour-title"
  >
    <h2 id="tour-title">{{ t('caseStudy.tourHeading') }}</h2>

    <div class="layout">
      <ol
        role="list"
        class="steps"
      >
        <li
          v-for="(step, i) in steps"
          :key="step.title"
          ref="stepEls"
          :data-index="i"
          class="step"
          :class="{ current: active === i }"
        >
          <h3>{{ step.title }}</h3>
          <p>{{ step.body }}</p>
          <!-- Each step carries its own screenshot; on wide screens it is replaced by the sticky phone. -->
          <img
            :src="`/images/kaizen/${images[i]}.webp`"
            width="720"
            height="1560"
            :alt="step.alt"
            loading="lazy"
            decoding="async"
            class="shot phone inline-phone"
          />
        </li>
      </ol>

      <div
        class="stage"
        aria-hidden="true"
      >
        <div class="stack">
          <img
            v-for="(name, i) in images"
            :key="name"
            :src="`/images/kaizen/${name}.webp`"
            width="720"
            height="1560"
            alt=""
            loading="lazy"
            decoding="async"
            class="shot phone"
            :class="{ shown: active === i }"
          />
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.tour {
  padding-block: var(--space-2xl);
}

h2 {
  margin-bottom: var(--space-l);
}

.steps {
  display: grid;
  gap: var(--space-xl);
}

.step {
  display: grid;
  gap: var(--space-2xs);
  max-width: 34rem;
}

.step h3 {
  font-size: var(--step-1);
}

.phone {
  --shot-radius: 9% / 4.2%;
}

.inline-phone {
  width: min(70%, 17rem);
  margin-top: var(--space-s);
}

.stage {
  display: none;
}

/*
 * Wide screens: the steps scroll past one sticky phone. The current step is the one crossing the
 * middle of the viewport, so the phone is held centred on that same line. The steps list is padded
 * by half the height difference between phone and step, so the first and last steps line up too
 * (otherwise the phone would still be scrolling in at the first, and be pushed up at the end of its
 * column at the last).
 */
@media (min-width: 56rem) {
  .layout {
    --phone-h: calc(19rem * 1560 / 720);
    --step-h: min(62vh, 36rem);
    display: grid;
    grid-template-columns: minmax(0, 1fr) minmax(0, 0.8fr);
    gap: var(--space-2xl);
  }

  /* Kept for screen readers (the sticky copy is aria-hidden), hidden visually. */
  .inline-phone {
    position: absolute;
    width: 1px;
    height: 1px;
    margin: -1px;
    overflow: hidden;
    clip: rect(0, 0, 0, 0);
  }

  .steps {
    gap: 0;
    padding-block: max(0px, calc((var(--phone-h) - var(--step-h)) / 2));
  }

  .step {
    min-height: var(--step-h);
    align-content: center;
    color: var(--muted);
    transition: color 200ms var(--ease-out);
  }

  .step.current {
    color: var(--text);
  }

  .stage {
    display: block;
  }

  /* Centred on the viewport's middle line; on short screens it stops just under the header. */
  .stack {
    position: sticky;
    top: max(calc(var(--header-h) + var(--space-s)), calc(50vh - var(--phone-h) / 2));
    display: grid;
    width: min(100%, 19rem);
    margin-inline: auto;
  }

  /* The next screenshot fades in on top while the previous one stays fully opaque underneath, and
     only disappears once it is covered. Fading both at once would let the page show through
     halfway, which reads as a flash. */
  .stack img {
    grid-area: 1 / 1;
    width: 100%;
    opacity: 0;
    visibility: hidden;
    transition:
      opacity 0s linear 300ms,
      visibility 0s linear 300ms;
  }

  .stack img.shown {
    z-index: 1;
    opacity: 1;
    visibility: visible;
    transition: opacity 300ms var(--ease-out);
  }
}

@media (prefers-reduced-motion: reduce) {
  .step,
  .stack img,
  .stack img.shown {
    transition: none;
  }
}
</style>
