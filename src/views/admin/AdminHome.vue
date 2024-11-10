<script setup>
import Login from '@/components/Login.vue';
import router from '@/router';
import { useAccountStore } from '@/stores/AccountStore';
import { onBeforeMount } from 'vue';

const accountStore = useAccountStore();

onBeforeMount(() => {
  if (accountStore.isLoggedIn && !accountStore.isAdmin) {
    router.push({ name: 'home_en' });
  }
});
</script>

<template>
  <div class="admin-home">
    <div v-if="accountStore.isAdmin">
      <h1>Admin Home</h1>
      <h2>Welcome back, {{ accountStore.user.username }}</h2>
      <p>Email: {{ accountStore.user.email }}</p>
      <small>User ID: {{ accountStore.user.id }}</small>
      <RouterLink
        :to="{ name: 'admin_users' }"
        class="btn btn-primary"
        >Users</RouterLink
      >
    </div>
    <div v-else>
      <Login />
    </div>
  </div>
</template>

<style scoped>
/* Extra Small Devices (Less than 576px) */
.admin-home {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 55vh;
}

/* Small Devices */
@media screen and (min-width: 576px) {
}

/* Medium Devices */
@media screen and (min-width: 768px) {
}

/* Large Devices*/
@media screen and (min-width: 992px) {
}

/* Extra Large Devices */
@media screen and (min-width: 1200px) {
}

/* Extra Extra Large Devices */
@media screen and (min-width: 1600px) {
}

/* Very Large Devices */
@media screen and (min-width: 2560px) {
}
</style>
