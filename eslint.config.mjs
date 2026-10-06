import { createConfigForNuxt } from '@nuxt/eslint-config/flat';

export default createConfigForNuxt({
  features: { tooling: true },
}).append({
  rules: {
    // Prettier writes void elements as <img />; match it instead of fighting the formatter.
    'vue/html-self-closing': ['warn', { html: { void: 'always', normal: 'always', component: 'always' } }],
  },
});
