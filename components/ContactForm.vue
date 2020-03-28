<template>
  <form
    @submit.prevent="sendMessage"
    class="form"
    action="https://formsubmit.co/greg@gregives.co.uk"
    method="POST"
  >
    <input type="hidden" name="_captcha" value="false" />
    <input type="hidden" name="_template" value="box" />
    <input type="text" name="_honey" />
    <input
      type="hidden"
      name="_webhook"
      value="https://hooks.zapier.com/hooks/catch/5805292/o2kxyrj/"
    />
    <label class="form__input">
      <input type="text" name="name" required />
      <span>Name</span>
    </label>
    <label class="form__input">
      <input type="email" name="email" required />
      <span>Email address</span>
    </label>
    <label class="form__input">
      <input type="text" name="_subject" required />
      <span>Subject</span>
    </label>
    <label class="form__input">
      <textarea @input="autoHeight" name="message" required></textarea>
      <span>Say hello</span>
    </label>
    <button :disabled="message === 1" class="form__submit" type="submit">
      Send message
    </button>
    <span v-if="message !== null" class="form__feedback">
      {{ message === null ? '' : messages[message] }}
    </span>
  </form>
</template>

<script>
export default {
  data() {
    return {
      message: null,
      messages: [
        'Sending...',
        'Thanks for your message!',
        'Uh oh, try again later!'
      ]
    }
  },
  methods: {
    autoHeight(event) {
      const textarea = event.target
      const borders = textarea.offsetHeight - textarea.clientHeight + 1
      textarea.style.height = 0
      textarea.style.height = textarea.scrollHeight + borders + 'px'
    },
    sendMessage(event) {
      this.message = 0
      fetch('https://formsubmit.co/ajax/greg@gregives.co.uk', {
        method: 'POST',
        body: new FormData(event.target)
      })
        .then(() => {
          this.message = 1
        })
        .catch(() => {
          this.message = 2
        })
    }
  }
}
</script>

<style lang="scss">
.form {
  input[name='_honey'] {
    display: none;
  }
}

.form__input {
  display: block;
  margin-top: 0.5rem;
  position: relative;

  input,
  textarea {
    background: $color__body--overlay;
    border-radius: $border-radius;
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

  &:not(:last-child) {
    margin-bottom: 1.5rem;
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
