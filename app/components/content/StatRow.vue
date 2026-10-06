<script setup lang="ts">
// A row of headline figures inside the case study prose (`::stat-row` in Markdown). Values come
// as written in the Markdown, already rounded and formatted for that language.
defineProps<{ items: { value: string; label: string }[] }>();
</script>

<template>
  <dl class="stat-row">
    <div
      v-for="item in items"
      :key="item.label"
    >
      <dt>{{ item.value }}</dt>
      <dd>{{ item.label }}</dd>
    </div>
  </dl>
</template>

<style scoped>
.stat-row {
  display: grid;
  gap: var(--space-s) var(--space-m);
  margin-block: var(--space-m) var(--space-l);
}

.stat-row > div {
  display: grid;
  gap: 0.6em;
}

/* Stacked on phones, the lines only divide the figures, with the same space above and below:
   text-box trims both ends to the letters, and the 0.3em makes up for Newsreader's digits rising
   a little above its capitals. Side by side, each column gets a line. */
.stat-row > div + div {
  padding-top: calc(var(--space-s) + 0.3em);
  border-top: 2px solid var(--kaizen);
}

dt {
  font-family: var(--font-display);
  font-size: var(--step-4);
  line-height: 1;
  letter-spacing: -0.01em;
  color: var(--text);
  text-box: trim-both cap alphabetic;
}

dd {
  margin: 0;
  font-size: var(--step--1);
  line-height: 1.4;
  color: var(--muted);
  text-box: trim-end alphabetic;
}

@media (min-width: 40rem) {
  .stat-row {
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }

  .stat-row > div {
    padding-top: calc(var(--space-s) + 0.3em);
    border-top: 2px solid var(--kaizen);
  }
}
</style>
