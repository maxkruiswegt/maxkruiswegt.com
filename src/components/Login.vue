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
    <div class="max-w-xs">
        <Alert v-if="error" :message="error" type="error" class="mb-2" />
        <form @submit.prevent="login" class="w-full">
            <div class="bg-background-10 p-5 rounded-lg shadow-lg">
                <h2 class="text-center">Login</h2>
                <div class="mt-4 flex flex-col">
                    <label class="mb-1">Email</label>
                    <input v-model="email" type="text" class="input" required>
                </div>
                <div class="mt-4 flex flex-col">
                    <label class="mb-1">Password</label>
                    <input v-model="password" type="password" class="input" required>
                </div>
                <div class="mt-4 flex justify-end">
                    <button class="btn btn-primary w-full">Login</button>
                </div>
            </div>
        </form>
    </div>
</template>