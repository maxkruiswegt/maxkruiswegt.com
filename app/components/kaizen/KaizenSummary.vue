<script setup lang="ts">
import { kaizenFigures, kaizenLinks } from '~/data/site';

const { t } = useI18n();
const { number } = useLocalized();

const links = computed(() => [
  { label: 'my-kaizen.com', href: kaizenLinks.site },
  { label: 'App Store', href: kaizenLinks.appStore },
  { label: 'Google Play', href: kaizenLinks.googlePlay },
  { label: 'Microsoft Store', href: kaizenLinks.microsoftStore },
  { label: t('caseStudy.summary.web'), href: kaizenLinks.web },
]);
</script>

<template>
  <section
    class="summary container"
    :aria-label="t('caseStudy.summary.label')"
  >
    <dl>
      <div>
        <dt>{{ t('caseStudy.summary.role') }}</dt>
        <dd>{{ t('caseStudy.summary.roleValue') }}</dd>
      </div>
      <div>
        <dt>{{ t('caseStudy.summary.timeline') }}</dt>
        <dd>{{ t('caseStudy.summary.timelineValue') }}</dd>
      </div>
      <div>
        <dt>{{ t('caseStudy.summary.platforms') }}</dt>
        <dd>{{ t('caseStudy.summary.platformsValue') }}</dd>
      </div>
      <div>
        <dt>{{ t('caseStudy.summary.stack') }}</dt>
        <dd>{{ t('caseStudy.summary.stackValue') }}</dd>
      </div>
      <div class="span-2">
        <dt>{{ t('caseStudy.summary.usage') }}</dt>
        <dd>
          {{
            t('caseStudy.summary.usageValue', {
              signups: number(kaizenFigures.signups),
              hours: number(kaizenFigures.focusHours),
              rating: number(kaizenFigures.rating, { minimumFractionDigits: 1 }),
            })
          }}
        </dd>
      </div>
      <div class="span-2">
        <dt>{{ t('caseStudy.summary.links') }}</dt>
        <dd>
          <ul
            role="list"
            class="links"
          >
            <li
              v-for="link in links"
              :key="link.href"
            >
              <a
                :href="link.href"
                target="_blank"
                rel="noopener"
                class="text-link"
              >
                {{ link.label }} <AppIcon name="arrow-up-right" />
                <span class="visually-hidden">{{ t('a11y.newTab') }}</span>
              </a>
            </li>
          </ul>
        </dd>
      </div>
    </dl>
  </section>
</template>

<style scoped>
.summary {
  container-type: inline-size;
}

dl {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: var(--space-s) var(--space-m);
  padding-block: var(--space-m);
  border-block: 1px solid var(--border);
}

dt {
  font-size: var(--step--1);
  color: var(--muted);
  margin-bottom: 0.15rem;
}

dd {
  font-size: var(--step--1);
  line-height: 1.45;
}

.span-2 {
  grid-column: 1 / -1;
}

.links {
  display: flex;
  flex-wrap: wrap;
  gap: 0.25rem var(--space-s);
}

.links a {
  font-weight: 500;
}

@container (min-width: 48rem) {
  dl {
    grid-template-columns: repeat(4, minmax(0, 1fr));
  }

  .span-2 {
    grid-column: span 2;
  }
}
</style>
