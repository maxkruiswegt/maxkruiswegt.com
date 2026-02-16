<script setup lang="ts">
defineProps<{
  message: string;
  type?: 'info' | 'success' | 'warning' | 'error';
}>();
</script>

<template>
  <div
    v-if="message"
    role="alert"
    class="alert"
    :class="type"
  >
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
