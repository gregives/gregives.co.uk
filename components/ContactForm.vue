<template>
  <form
    class="form"
    action="https://formsubmit.co/greg@gregives.co.uk"
    method="POST"
    :disabled="disabled"
  >
    <input
      type="hidden"
      name="_next"
      value="https://gregives.co.uk/contact/?thank=you"
    />
    <input type="hidden" name="_template" value="box" />
    <input type="text" name="_honey" />
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
      <textarea name="message" required @input="autoHeight"></textarea>
      <span>Say hello</span>
    </label>
    <button class="form__submit" type="submit">Send message</button>
  </form>
</template>

<script>
export default {
  data() {
    return {
      disabled: false
    }
  },
  mounted() {
    this.disabled = this.$route.query.thank === 'you'
  },
  methods: {
    autoHeight(event) {
      const textarea = event.target
      const borders = textarea.offsetHeight - textarea.clientHeight + 1
      textarea.style.height = 0
      textarea.style.height = textarea.scrollHeight + borders + 'px'
    }
  }
}
</script>

<style lang="scss">
.form {
  position: relative;

  &[disabled] {
    > * {
      filter: blur(0.5rem);
      pointer-events: none;
    }

    &::after {
      @include font__fancy;
      @include h1;
      @include title;

      color: $color__primary;
      content: 'Thanks';
      left: 50%;
      position: absolute;
      text-decoration: wavy underline $color__primary $border-weight;
      text-underline-offset: 0.5rem;
      top: 30%;
      transform: translate(-50%, -50%) rotate(-15deg);
      -webkit-text-fill-color: currentColor;
    }
  }

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
