<template>
  <form
    class="form"
    name="Contact Form"
    method="post"
    data-netlify="true"
    data-netlify-recaptcha="true"
    @submit.prevent="onSubmit"
  >
    <input type="hidden" name="form-name" value="Contact Form" />
    <label class="form__input">
      <input type="text" name="name" required />
      <span>Name</span>
    </label>
    <label class="form__input">
      <input type="email" name="email" required />
      <span>Email address</span>
    </label>
    <label class="form__input">
      <input type="text" name="subject" required />
      <span>Subject</span>
    </label>
    <label class="form__input">
      <textarea name="message" required @input="autoHeight"></textarea>
      <span>Say hello</span>
    </label>
    <recaptcha />
    <p class="form__terms">
      This site is protected by reCAPTCHA and the Google
      <a
        href="https://policies.google.com/privacy"
        target="_blank"
        rel="noreferrer"
        >Privacy Policy</a
      >
      and
      <a
        href="https://policies.google.com/terms"
        target="_blank"
        rel="noreferrer"
        >Terms of Service</a
      >
      apply.
    </p>
    <button class="form__submit" type="submit" :disabled="success">
      Send message
    </button>
  </form>
</template>

<script>
export default {
  data() {
    return {
      success: false
    }
  },
  mounted() {
    this.success = Object.keys(this.$route.query).includes('success')
  },
  beforeDestroy() {
    this.$recaptcha.destroy()
  },
  methods: {
    autoHeight(event) {
      const textarea = event.target
      const borders = textarea.offsetHeight - textarea.clientHeight
      textarea.style.height = 0
      textarea.style.height = textarea.scrollHeight + borders + 'px'
    },
    async onSubmit(event) {
      try {
        const token = await this.$recaptcha.getResponse()
        const params = new URLSearchParams(new FormData(event.target))
        params.set('g-recaptcha-response', token)

        fetch('/', {
          method: 'POST',
          headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
          body: params.toString()
        })
          .then(() => console.log('Form successfully submitted'))
          .catch((error) => console.error('Form failed:', error))

        await this.$recaptcha.reset()
      } catch (error) {
        console.log('reCAPTCHA error:', error)
      }
    }
  }
}
</script>

<style lang="scss">
.form {
  position: relative;
}

.form__input {
  display: block;
  margin-top: 0.5rem;
  position: relative;

  input,
  textarea {
    background: $color__body--overlay;
    border-radius: $border-radius !important;
    border: $border-weight solid $color__primary--muted;
    box-shadow: $box-shadow--small;
    color: $color__text;
    display: block;
    padding: 1rem;
    padding-bottom: 0.75rem;
    resize: none;
    transition: border-color 150ms $transition__normal;
    width: 100%;

    &:focus {
      border-color: $color__primary;
      outline: none !important;

      ~ span {
        color: $color__primary;
      }
    }
  }

  textarea {
    min-height: 8rem;
  }

  span {
    bottom: 100%;
    color: $color__text--muted;
    left: 0.5rem;
    margin-bottom: -0.75rem;
    overflow: hidden;
    padding: 0 0.5rem;
    position: absolute;
    z-index: 1;

    &::before {
      background-color: $color__body;
      bottom: -0.5rem;
      content: '';
      filter: blur(0.125rem);
      height: 100%;
      left: -50%;
      position: absolute;
      width: 200%;
      z-index: -1;
    }

    &::after {
      background-color: $color__body--overlay;
      bottom: -60%;
      content: '';
      filter: blur(0.125rem);
      height: 100%;
      left: -50%;
      position: absolute;
      width: 200%;
      z-index: -1;
    }
  }

  &:not(:last-of-type) {
    margin-bottom: 1.5rem;
  }
}

.form__terms {
  color: $color__text--muted;
  font-size: 70%;
  margin: 0.75rem 0 1.5rem;

  a {
    @include link;
  }
}

.form__submit {
  @include button;
  @include button--primary;
}

.form__feedback {
  margin-left: 0.5rem;
}
</style>
