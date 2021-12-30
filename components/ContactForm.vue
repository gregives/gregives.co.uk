<template>
  <form
    class="form"
    name="Contact Form"
    method="POST"
    data-netlify="true"
    data-netlify-recaptcha="true"
    @submit.prevent="onSubmit"
  >
    <input type="hidden" name="form-name" value="Contact Form" />
    <label class="form__input">
      <input type="text" name="name" required :readonly="success" />
      <span>Name</span>
    </label>
    <label class="form__input">
      <input type="email" name="email" required :readonly="success" />
      <span>Email address</span>
    </label>
    <label class="form__input">
      <input type="text" name="subject" required :readonly="success" />
      <span>Subject</span>
    </label>
    <label class="form__input">
      <textarea
        name="message"
        required
        :readonly="success"
        @input="autoHeight"
      ></textarea>
      <span>Say hello</span>
    </label>
    <recaptcha />
    <p class="form__terms">
      <span>
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
      </span>
    </p>
    <button class="form__submit" type="submit" :disabled="success">
      Send message
      <send-icon />
    </button>
    <span class="form__thanks">Thanks!</span>
  </form>
</template>

<script>
import SendIcon from 'icons/Send'

export default {
  components: {
    SendIcon
  },
  data() {
    return {
      success: false
    }
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
        await this.$recaptcha.getResponse()
        await fetch('/', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
          },
          body: new URLSearchParams(new FormData(event.target)).toString()
        })

        this.success = true
        await this.$recaptcha.reset()
      } catch {
        // Ignore errors for now
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
  z-index: 1;

  > span {
    background-color: $color__body;
    filter: drop-shadow(0 0 0.25rem $color__body)
      drop-shadow(0 0 0.25rem $color__body)
      drop-shadow(0 0 0.25rem $color__body)
      drop-shadow(0 0 0.25rem $color__body);

    a {
      @include link;
    }
  }
}

.form__submit {
  @include button;
  @include button--primary;

  .material-design-icon {
    display: inline-block;
    margin-left: 0.2rem;
    margin-right: -0.35rem;
    transform: scale(0.95);
    transition: color 150ms $transition__snappy--out,
      opacity 600ms $transition__normal--out,
      transform 900ms $transition__snappy--out;
  }

  &:disabled {
    opacity: 1 !important;

    .material-design-icon {
      color: $color__primary;
      opacity: 0;
      transform: scale(0.8) translate(5rem, 2rem) rotate(30deg);
    }

    + .form__thanks {
      opacity: 1;
      visibility: visible;
    }
  }
}

.form__thanks {
  margin-left: 1rem;
  opacity: 0;
  transition: opacity 300ms 300ms $transition__normal;
  visibility: hidden;
}

.form__feedback {
  margin-left: 0.5rem;
}
</style>
