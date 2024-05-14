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
    <div class="flex flex-col items-center justify-center h-[55vh]">
        <div v-if="accountStore.isAdmin">
            <h1>Admin Home</h1>
            <h2>Welcome back, {{ accountStore.user.username }}</h2>
            <p>Email: {{ accountStore.user.email }}</p>
            <small>User ID: {{ accountStore.user.id }}</small>
            <RouterLink :to="{ name: 'admin_users' }" class="btn btn-primary">Users</RouterLink>
        </div>
        <div v-else>
            <Login />
        </div>
    </div>
</template>
