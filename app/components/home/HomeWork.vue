<script setup lang="ts">
import { clients } from '~/data/clients';
import { site } from '~/data/site';

const { t } = useI18n();
const { pick } = useLocalized();
</script>

<template>
  <section
    id="work"
    class="section"
    aria-labelledby="work-title"
  >
    <div class="container">
      <header class="section-head">
        <h2 id="work-title">{{ t('work.heading') }}</h2>
        <i18n-t
          keypath="work.intro"
          tag="p"
          scope="global"
        >
          <template #dtt>
            <a
              :href="pick(site.dtt)"
              target="_blank"
              rel="noopener"
              >DTT<span class="visually-hidden">{{ ` ${t('a11y.newTab')}` }}</span></a
            >
          </template>
        </i18n-t>
      </header>

      <ul
        role="list"
        class="clients"
      >
        <li
          v-for="client in clients"
          :key="client.id"
          class="client reveal"
        >
          <ClientMark
            :logo="client.logo"
            class="mark"
          />
          <h3>{{ client.name }}</h3>
          <p class="part small">{{ pick(client.part) }}</p>
          <p class="about">{{ pick(client.about) }}</p>
        </li>
      </ul>
    </div>
  </section>
</template>

<style scoped>
.clients {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 0 var(--space-s);
}

.client {
  display: grid;
  grid-template-rows: auto auto auto 1fr;
  align-content: start;
  padding-block: var(--space-s);
  border-top: 1px solid var(--border);
}

.client .mark {
  --base: 2.2rem;
  --max-h: 2.4rem;
  --max-w: 9rem;
}

.about {
  font-size: var(--step--1);
}

.mark {
  margin-bottom: var(--space-s);
}

h3 {
  font-size: var(--step-0);
  line-height: 1.35;
}

.part {
  color: var(--muted);
}

.about {
  margin-top: var(--space-2xs);
}

@media (min-width: 40rem) {
  .clients {
    gap: 0 var(--space-l);
  }

  .client {
    padding-block: var(--space-m);
  }

  .client .mark {
    --base: 3rem;
    --max-h: 3.5rem;
    --max-w: 12rem;
  }

  .about {
    font-size: var(--step-0);
  }
}

@media (min-width: 64rem) {
  .clients {
    grid-template-columns: repeat(4, minmax(0, 1fr));
  }
}
</style>
