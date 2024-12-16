<script setup>
import { computed } from 'vue';

const props = defineProps({
  message: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    required: false,
    validator: (value) => {
      return ['info', 'success', 'warning', 'error'].includes(value);
    },
  },
});

// TODO: Add SVG icons
// const svg = computed(() => {
//   switch (props.type) {
//     case 'info':
//       return -;
//     case 'success':
//       return -;
//     case 'warning':
//       return -;
//     case 'error':
//       return -;
//     default:
//       return -;
//   }
// });
</script>

<template>
  <div
    v-if="message"
    role="alert"
    class="alert"
    :class="type"
  >
    <!-- <span v-html="svg"></span> -->
    <span>{{ message }}</span>
  </div>
</template>

<style scoped>
.alert {
  background-color: var(--background-20);
  padding: 1rem;
  border-radius: 0.5rem;
  text-align: center;
  display: flex;
  align-items: center;
  gap: 1rem;
}

.alert.info {
  background-color: rgba(14, 165, 233, 0.75);
}

.alert.success {
  background-color: rgba(34, 197, 94, 0.75);
}

.alert.warning {
  background-color: rgba(251, 146, 60, 0.75);
}

.alert.error {
  background-color: rgba(239, 68, 68, 0.75);
}
</style>
