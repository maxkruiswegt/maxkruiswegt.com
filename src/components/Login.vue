<script setup>
import { ref } from 'vue';
import { useAccountStore } from '@/stores/AccountStore';
import Alert from './Alert.vue';

const accountStore = useAccountStore();

// Data
const error = ref('');
const email = ref('');
const password = ref('');

const login = async () => {
  try {
    await accountStore.login(email.value, password.value);
  } catch (err) {
    error.value = err.message;
  }
};
</script>

<template>
  <div class="login-page">
    <Alert
      v-if="error"
      :message="error"
      type="error"
    />
    <form
      @submit.prevent="login"
      class="login-form"
    >
      <div class="login-card">
        <h2 class="card-title">Login</h2>
        <div class="card-row">
          <label class="field-label">Email</label>
          <input
            v-model="email"
            type="text"
            required
          />
        </div>
        <div class="card-row">
          <label class="field-label">Password</label>
          <input
            v-model="password"
            type="password"
            required
          />
        </div>
        <div class="submit-button">
          <button class="btn btn-primary">Login</button>
        </div>
      </div>
    </form>
  </div>
</template>

<style scoped>
.login-page {
  max-width: 20rem;
}

.alert {
  margin-bottom: 0.5rem;
}

.login-form {
  width: 100%;
}

.login-card {
  background-color: var(--background-10);
  padding: 1.25rem;
  border-radius: 0.5rem;
  box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.1);
}

.card-title {
  text-align: center;
}

.card-row {
  display: flex;
  flex-direction: column;
  margin-top: 1rem;
}

.field-label {
  margin-bottom: 0.25rem;
}

.submit-button {
  display: flex;
  justify-content: flex-end;
  margin-top: 1rem;
}

.btn {
  width: 100%;
}
</style>
