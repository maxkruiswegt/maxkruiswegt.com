<script setup lang="ts">
const { t, locale } = useI18n();

useHead({ title: t('contact.title') });
const config = useRuntimeConfig();

const alertMessage = ref<string | null>(null);
const alertType = ref<'info' | 'success' | 'warning' | 'error' | undefined>(undefined);
const buttonDisabled = ref(false);

const name = ref('');
const email = ref('');
const subject = ref('');
const message = ref('');

const submitContactForm = async () => {
  try {
    buttonDisabled.value = true;

    const data = await $fetch<{ message?: string; error?: string }>(config.public.apiBase + '/contact', {
      method: 'POST',
      body: {
        locale: locale.value,
        name: name.value,
        email: email.value,
        subject: subject.value,
        message: message.value,
      },
    });

    if (data.error) throw new Error(data.error);

    alertType.value = 'success';
    alertMessage.value = data.message || 'Message sent successfully';

    name.value = '';
    email.value = '';
    subject.value = '';
    message.value = '';
  } catch (err: unknown) {
    alertType.value = 'error';
    const fetchErr = err as { data?: { error?: string }; message?: string };
    alertMessage.value = fetchErr.data?.error || t('contact.error');
  } finally {
    buttonDisabled.value = false;
  }
};
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
        <h1 class="card-title">{{ t('contact.title') }}</h1>
        <p
          class="card-text"
          v-html="t('contact.description')"
        ></p>
        <div class="form-group">
          <label
            class="form-label"
            for="contact-name"
            >{{ t('contact.form.name') }}</label
          >
          <input
            id="contact-name"
            v-model="name"
            type="text"
            required
            minlength="2"
            maxlength="100"
            autocomplete="name"
          />
        </div>
        <div class="form-group">
          <label
            class="form-label"
            for="contact-email"
            >{{ t('contact.form.email') }}</label
          >
          <input
            id="contact-email"
            v-model="email"
            type="email"
            required
            maxlength="254"
            autocomplete="email"
          />
        </div>
        <div class="form-group">
          <label
            class="form-label"
            for="contact-subject"
            >{{ t('contact.form.subject') }}</label
          >
          <input
            id="contact-subject"
            v-model="subject"
            type="text"
            required
            minlength="2"
            maxlength="200"
          />
        </div>
        <div class="form-group">
          <label
            class="form-label"
            for="contact-message"
            >{{ t('contact.form.message') }}</label
          >
          <textarea
            id="contact-message"
            v-model="message"
            rows="4"
            required
            minlength="10"
            maxlength="5000"
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
  font-size: 2.369rem;
  line-height: 1.2;
  text-align: center;
}

@media screen and (min-width: 992px) {
  .card-title {
    font-size: 3.158rem;
  }
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

/* Large Devices*/
@media screen and (min-width: 992px) {
  .contact-container {
    margin: 15vh auto;
  }
}
</style>
