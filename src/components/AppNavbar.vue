<script setup>
import { ref } from 'vue';
import { useThemeStore } from '@/stores/ThemeStore';
import { useI18n } from 'vue-i18n';

const { t, locale } = useI18n();

const themeStore = useThemeStore();

const isMenuOpen = ref(false);
const toggleMenu = () => {
    isMenuOpen.value = !isMenuOpen.value;
}
</script>

<template>
    <nav class="flex justify-center">
        <div class="w-full max-w-screen-xl p-4 lg:p-8">
            <div class="flex justify-between items-center">
                <RouterLink :to="{ name: `home_${locale}` }" class="sm:hover:scale-105 transition duration-300">
                    <img :src="themeStore.logo" alt="Logo" class="h-8 sm:h-10"/>
                </RouterLink>
                <div class="lg:hidden flex gap-4 items-center">
                    <span class="material-symbols-outlined cursor-pointer text-2xl transition duration-300" @click="themeStore.toggleTheme()">{{ themeStore.icon }}</span>
                    <span @click="toggleMenu" class="material-symbols-outlined text-2xl">menu</span>
                </div>
                <div class="hidden gap-10 items-center lg:flex">
                    <RouterLink :to="{ name: `home_${locale}` }" class="navlink flex gap-1.5 items-center">
                        <span class="material-symbols-outlined text-xl">home</span>
                        <p>Home</p>
                    </RouterLink>
                    <RouterLink :to="{ name: `portfolio_${locale}` }" class="navlink flex gap-1.5 items-center">
                        <span class="material-symbols-outlined text-xl">work</span>
                        <p>Portfolio</p>
                    </RouterLink>
                    <RouterLink :to="{ name: `contact_${locale}` }" class="navlink flex gap-1.5 items-center">
                        <span class="material-symbols-outlined text-xl">help</span>
                        <p>Contact</p>
                    </RouterLink>
                    <span class="material-symbols-outlined cursor-pointer text-2xl navlink" @click="themeStore.toggleTheme()">{{ themeStore.icon }}</span>
                </div>
            </div>
            <div class="lg:hidden flex justify-center mt-5" v-if="isMenuOpen">
                <div>
                    <RouterLink :to="{ name: `home_${locale}` }" class="flex py-2 px-8 gap-3 items-center">
                        <span class="material-symbols-outlined text-xl">home</span>
                        <p>Home</p>
                    </RouterLink>
                    <RouterLink :to="{ name: `portfolio_${locale}` }" class="flex py-2 px-8 gap-3 items-center">
                        <span class="material-symbols-outlined text-xl">work</span>
                        <p>Portfolio</p>
                    </RouterLink>
                    <RouterLink :to="{ name: `contact_${locale}` }" class="flex py-2 px-8 gap-3 items-center">
                        <span class="material-symbols-outlined text-xl">help</span>
                        <p>Contact</p>
                    </RouterLink>
                </div>
            </div>
        </div>
    </nav>
</template>

<style scoped>

.navlink {
    @apply hover:text-primary hover:scale-105 transition duration-300;
}

</style>