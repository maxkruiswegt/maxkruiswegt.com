<script setup>
import Login from '@/components/Login.vue';
import router from '@/router';
import { useAccountStore } from '@/stores/AccountStore';
import { onBeforeMount, ref } from 'vue';
import { useI18n } from 'vue-i18n';
import axios from 'axios';
import Alert from '@/components/Alert.vue';

const { t } = useI18n();
const accountStore = useAccountStore();

const error = ref(null);
const users = ref(null);

const headers = ref([]);
const items = ref([]);

onBeforeMount(async () => {
    if (accountStore.isLoggedIn && !accountStore.isAdmin) {
      router.push({ name: 'home_en' });
      return;
    }

    if (accountStore.isAdmin) {
        await fetchUsers();
        if (users.value) {
            headers.value = Object.keys(users.value[0]).map(key => ({ text: key.toUpperCase(), value: key }));
            items.value = users.value;
        }
    }
});

const fetchUsers = async () => {
    try {
        const response = await axios.get(import.meta.env.VITE_API_URL + '/users', {
            headers: {
                Authorization: `Bearer ${accountStore.token}`
            }
        });
        users.value = response.data;
    } catch (err) {
        console.error(err);
        error.value = err.message;
    }
};


</script>

<template>
    <div class="flex flex-col items-center justify-center h-[55vh]">
        <div v-if="accountStore.isAdmin">
            <div class="flex mb-4">
                <RouterLink :to="{ name: 'admin' }" class="transition duration-300 hover:text-primary hover:scale-105 flex gap-1">
                    <span class="material-symbols-outlined">arrow_back</span>
                    <p>{{ t('buttons.back') }}</p>
                </RouterLink>
            </div>
            <h1>Users</h1>
            <Alert v-if="error" :message="error" type="error" class="mt-2" />
            <EasyDataTable :headers="headers" :items="items" :table-height="300" :table-min-height="300" :rows-per-page="10" table-class-name="customize-table" class="mt-2 table table-fixed w-full" alternating/>
        </div>
        <div v-else>
            <Login />
        </div>
    </div>
</template>

<style scoped>
.customize-table {
  --easy-table-border: 1px solid var(--background-60);
  --easy-table-row-border: 1px solid var(--background-40);

  --easy-table-header-font-size: 14px;
  --easy-table-header-height: 50px;
  --easy-table-header-font-color: var(--text);
  --easy-table-header-background-color: var(--background-20);

  --easy-table-header-item-padding: 10px 15px;

  --easy-table-body-even-row-font-color: var(--text);
  --easy-table-body-even-row-background-color: var(--background-40);

  --easy-table-body-row-font-color: var(--text);
  --easy-table-body-row-background-color: var(--background-30);
  --easy-table-body-row-height: 50px;
  --easy-table-body-row-font-size: 1rem;

  --easy-table-body-row-hover-font-color: var(--text-80);
  --easy-table-body-row-hover-background-color: var(--background-80);

  --easy-table-body-item-padding: 10px 15px;

  --easy-table-footer-background-color: var(--background-20);
  --easy-table-footer-font-color: var(--text);
  --easy-table-footer-font-size: 1rem;
  --easy-table-footer-padding: 0px 10px;
  --easy-table-footer-height: 50px;

  --easy-table-scrollbar-track-color: var(--background-40);
  --easy-table-scrollbar-color: var(--background-40);
  --easy-table-scrollbar-thumb-color: var(--background-60);
  --easy-table-scrollbar-corner-color: var(--background-40);

  --easy-table-loading-mask-background-color: var(--background-40);
}
</style>