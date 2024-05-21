<script setup>
import Alert from '@/components/Alert.vue';
import axios from 'axios';
import { ref } from 'vue';
import { useI18n } from 'vue-i18n';

const { t, locale } = useI18n();

const alertMessage = ref(null);
const alertType = ref(null);

const name = ref('');
const email = ref('');
const subject = ref('');
const message = ref('');

const submitContactForm = async () => {
    try {
        let response = await axios.post(import.meta.env.VITE_API_URL + '/contact', {
            locale: locale.value,
            name: name.value,
            email: email.value,
            subject: subject.value,
            message: message.value
        });
        const data = response.data;

        if(data.error) throw Error(data.error);
        
        // Show success message
        alertType.value = 'success';
        alertMessage.value = data.message;
        
        // Clear form
        name.value = '';
        email.value = '';
        subject.value = '';
        message.value = '';
    } catch (err) {
        alertType.value = 'error';
        alertMessage.value = err.response?.data.error || err.message
    }
};
</script>

<template>
    <div class="contact-container">
        <Alert v-if="alertMessage" :message="alertMessage" :type="alertType" class="mb-2" />
        <form @submit.prevent="submitContactForm">
            <div class="bg-background-10 p-5 rounded-lg shadow-lg">
                <h2 class="text-center">{{ t('contact.title') }}</h2>
                <p class="text-center mt-2 break-words">{{ t('contact.description') }}</p>
                <div class="mt-4 flex flex-col">
                    <label class="mb-1">{{ t('contact.form.name') }}</label>
                    <input v-model="name" type="text" class="input" required>
                </div>
                <div class="mt-4 flex flex-col">
                    <label class="mb-1">{{ t('contact.form.email') }}</label>
                    <input v-model="email" type="email" class="input" required>
                </div>
                <div class="mt-4 flex flex-col">
                    <label class="mb-1">{{ t('contact.form.subject') }}</label>
                    <input v-model="subject" type="text" class="input" required>
                </div>
                <div class="mt-4 flex flex-col">
                    <label class="mb-1">{{ t('contact.form.message') }}</label>
                    <textarea v-model="message" class="input" rows="4" required></textarea>
                </div>
                <div class="mt-4 flex justify-end">
                    <button class="btn btn-primary w-full">{{ t('contact.form.submit') }}</button>
                </div>
            </div>
        </form>
    </div>
</template>

<style scoped>
.contact-container {
    @apply max-w-lg w-full lg:my-[15vh];
}
</style>