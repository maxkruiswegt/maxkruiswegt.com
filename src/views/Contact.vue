<script setup>
import Alert from '@/components/Alert.vue';
import axios from 'axios';
import { onMounted, ref } from 'vue';
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
      message: message.value,
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
    alertMessage.value = err.response?.data.error || err.message;
  } finally {
    // Enable button
    buttonDisabled.value = false;
  }
};

onMounted(() => {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      handleIntersection(entry, observer);
    });
  });

  const hiddenElements = document.querySelectorAll('.hidden-element');
  hiddenElements.forEach((element) => {
    observer.observe(element);
  });

  function handleIntersection(entry, observer) {
    if (entry.isIntersecting) {
      entry.target.classList.add('show-element');
      entry.target.classList.remove('hidden-element');
      observer.unobserve(entry.target);
    }
  }
});
</script>

<template>
  <div class="contact-container hidden-element">
    <Alert
      v-if="alertMessage"
      :message="alertMessage"
      :type="alertType"
    />
    <form @submit.prevent="submitContactForm">
      <div class="contact-card">
        <h2 class="card-title">{{ t('contact.title') }}</h2>
        <p class="card-text">{{ t('contact.description') }}</p>
        <div class="form-group">
          <label class="form-label">{{ t('contact.form.name') }}</label>
          <input
            v-model="name"
            type="text"
            required
          />
        </div>
        <div class="form-group">
          <label class="form-label">{{ t('contact.form.email') }}</label>
          <input
            v-model="email"
            type="email"
            required
          />
        </div>
        <div class="form-group">
          <label class="form-label">{{ t('contact.form.subject') }}</label>
          <input
            v-model="subject"
            type="text"
            required
          />
        </div>
        <div class="form-group">
          <label class="form-label">{{ t('contact.form.message') }}</label>
          <textarea
            v-model="message"
            rows="4"
            required
          ></textarea>
        </div>
        <div class="form-group">
          <button
            class="btn btn-primary"
            :disabled="buttonDisabled"
          >
            {{ t('contact.form.submit') }}
          </button>
        </div>
      </div>
    </form>
  </div>
</template>

<style scoped>
/* Extra Small Devices (Less than 576px) */
.contact-container {
  max-width: 32rem;
  width: 100%;
}

.alert {
  margin-bottom: 0.5rem;
}

.contact-card {
  background-color: var(--background-10);
  padding: 1.25rem;
  border-radius: 0.5rem;
  box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.1);
}

.card-title {
  text-align: center;
}

.card-text {
  text-align: center;
  margin-top: 0.5rem;
  overflow-wrap: break-word;
}

.form-group {
  margin-top: 1rem;
  display: flex;
  flex-direction: column;
}

.form-label {
  margin-bottom: 0.25rem;
}

/* Small Devices */
@media screen and (min-width: 576px) {
}

/* Medium Devices */
@media screen and (min-width: 768px) {
}

/* Large Devices*/
@media screen and (min-width: 992px) {
  .contact-container {
    margin: 15vh auto;
  }
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
