<script setup lang="ts">
import { education } from '~/data/experience';

const { t } = useI18n();
const { pick, number } = useLocalized();
const { transcript } = education;
</script>

<template>
  <section
    id="education"
    class="section education"
    aria-labelledby="education-title"
  >
    <div class="container">
      <header class="section-head">
        <h2 id="education-title">{{ t('education.heading') }}</h2>
      </header>

      <div class="layout">
        <div class="degree-col">
          <div class="degree">
            <ClientMark :logo="education.logo" />
            <div>
              <h3>{{ pick(education.name) }}</h3>
              <p class="place">{{ education.place }}</p>
            </div>
          </div>
          <p class="status">{{ pick(education.status) }}</p>

          <dl class="highlights">
            <div
              v-for="item in education.highlights"
              :key="item.label.en"
            >
              <dt>{{ pick(item.label) }}</dt>
              <dd>
                {{ pick(item.text) }}
                <a
                  v-if="item.href"
                  :href="item.href"
                  target="_blank"
                  rel="noopener"
                  class="text-link"
                >
                  {{ item.href.replace('https://', '') }}
                  <AppIcon name="arrow-up-right" />
                  <span class="visually-hidden">{{ t('a11y.newTab') }}</span>
                </a>
              </dd>
            </div>
          </dl>
        </div>

        <!-- A typeset excerpt of the real transcript, so the numbers read as a document, not a stat row. -->
        <aside
          class="transcript reveal"
          aria-labelledby="transcript-title"
        >
          <h3 id="transcript-title">{{ t('education.transcriptTitle') }}</h3>
          <!-- The average stands apart from the list, so it isn't read as the average of those grades. -->
          <p class="average">
            <span class="average-grade">{{ transcript.average }}</span>
            <span>{{ t('education.average', { credits: number(transcript.credits) }) }}</span>
          </p>
          <h4 id="grades-title">{{ t('education.highest') }}</h4>
          <table aria-labelledby="grades-title">
            <tbody>
              <tr
                v-for="row in transcript.grades"
                :key="row.course.en"
              >
                <th scope="row">{{ pick(row.course) }}</th>
                <td>{{ row.grade }}</td>
              </tr>
            </tbody>
          </table>
        </aside>
      </div>
    </div>
  </section>
</template>

<style scoped>
/* Its own band, so the degree reads as a milestone instead of one more list in the page rhythm. */
.education {
  background: var(--surface);
}

.layout {
  display: grid;
  gap: var(--space-xl);
  align-items: start;
}

.degree {
  display: flex;
  align-items: center;
  gap: var(--space-s);
}

h3 {
  font-size: var(--step-1);
}

.place {
  color: var(--muted);
}

.status {
  margin-top: var(--space-m);
  font-size: var(--step-1);
  line-height: 1.45;
  max-width: 34rem;
}

.highlights {
  display: grid;
  gap: var(--space-m);
  margin-top: var(--space-l);
  max-width: var(--measure);
}

.highlights > div {
  padding-top: var(--space-s);
  border-top: 1px solid var(--border);
}

dt {
  font-weight: 600;
}

dd {
  margin: var(--space-3xs) 0 0;
}

.transcript {
  padding: var(--space-m) var(--space-m) var(--space-2xs);
  background: var(--raised);
  border: 1px solid var(--border);
  border-radius: var(--radius-m);
}

.transcript h3 {
  font-size: var(--step-0);
  margin-bottom: var(--space-xs);
}

/* A condensed table: one line per course, numbers right-aligned so they compare at a glance. */
table {
  width: 100%;
  border-collapse: collapse;
}

th,
td {
  padding-block: 0.5rem;
  border-top: 1px solid var(--border);
  vertical-align: baseline;
}

th {
  font-weight: 400;
  text-align: left;
}

td {
  width: 3rem;
  text-align: right;
  font-family: var(--font-display);
  font-size: var(--step-1);
  line-height: 1;
}

.average {
  display: flex;
  align-items: baseline;
  gap: var(--space-s);
  padding-block: var(--space-s) var(--space-m);
  border-top: 1px solid var(--border);
  color: var(--muted);
}

.average-grade {
  font-family: var(--font-display);
  font-size: var(--step-4);
  line-height: 1;
  color: var(--text);
}

.transcript h4 {
  font-size: var(--step--1);
  font-weight: 600;
  color: var(--muted);
  margin-bottom: var(--space-2xs);
}

@media (min-width: 56rem) {
  .layout {
    grid-template-columns: minmax(0, 1.25fr) minmax(0, 1fr);
    gap: var(--space-2xl);
  }
}
</style>
