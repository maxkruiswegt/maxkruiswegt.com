<script setup>
import Alert from '@/components/Alert.vue';
import axios from 'axios';
import { ref } from 'vue';
import { useI18n } from 'vue-i18n';

const { t, locale } = useI18n();

const alertMessage = ref(null);
const alertType = ref(null);
const buttonDisabled = ref(false);

const name = ref('');
const email = ref('');
const subject = ref('');
const message = ref('');

const submitContactForm = async () => {
  try {
    // Disable button
    buttonDisabled.value = true;

    // Send contact form data
    let response = await axios.post(import.meta.env.VITE_API_URL + '/contact', {
      locale: locale.value,
      name: name.value,
      email: email.value,
      subject: subject.value,
      message: message.value
    });

    // Get response data
    const data = response.data;

    // Check for errors
    if (data.error) throw Error(data.error);

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
  } finally {
    // Enable button
    buttonDisabled.value = false;
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
        <div class="form-group">
          <label class="form-label">{{ t('contact.form.name') }}</label>
          <input v-model="name" type="text" required>
        </div>
        <div class="form-group">
          <label class="form-label">{{ t('contact.form.email') }}</label>
          <input v-model="email" type="email" required>
        </div>
        <div class="form-group">
          <label class="form-label">{{ t('contact.form.subject') }}</label>
          <input v-model="subject" type="text" required>
        </div>
        <div class="form-group">
          <label class="form-label">{{ t('contact.form.message') }}</label>
          <textarea v-model="message" rows="4" required></textarea>
        </div>
        <div class="form-group">
          <button class="btn btn-primary w-full" :disabled="buttonDisabled">{{ t('contact.form.submit') }}</button>
        </div>
      </div>
    </form>
  </div>
</template>

<style scoped>
.contact-container {
  @apply max-w-lg w-full lg:my-[15vh];
}

.form-group {
  @apply mt-4 flex flex-col;
}

.form-label {
  @apply mb-1;
}
</style>