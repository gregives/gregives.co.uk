<template>
  <form
    class="comment__form"
    name="Comment Form"
    method="POST"
    data-netlify="true"
    data-netlify-recaptcha="true"
    @submit.prevent="onSubmit"
  >
    <input type="hidden" name="form-name" value="Comment Form" />
    <input type="hidden" name="url" :value="$route.path" />
    <div class="comment__heading">
      <input type="text" name="name" placeholder="Your name" required />
    </div>
    <div class="comment__textarea">
      <textarea
        name="text"
        required
        placeholder="Join the conversation"
        @input="autoHeight"
      ></textarea>
    </div>
    <recaptcha />
    <button class="comment__submit" type="submit">Comment</button>
  </form>
</template>

<script>
import ViewCounter from '~/components/ViewCounter'

export default {
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

        const formData = new FormData(event.target)
        await fetch('/', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
          },
          body: new URLSearchParams(formData).toString()
        })

        // Reset the form
        event.target.reset()
        await this.$recaptcha.reset()

        // Optimistically show new comment
        this.$emit('refresh', Object.fromEntries(formData.entries()))

        // Update after 5 seconds with the comments from fauna
        setTimeout(async () => {
          await ViewCounter.methods.updateViewCounter.bind(this)()
          this.$emit('refresh')
        }, 5000)
      } catch {
        // Ignore errors for now
      }
    }
  }
}
</script>

<style lang="scss">
.comment__form {
  margin-bottom: 3.5rem;

  input,
  textarea {
    background-color: $color__body--overlay;
    border-radius: $border-radius !important;
    border: $border-weight solid $color__primary--muted;
    color: $color__text;
    transition: border-color 150ms $transition__normal;

    &:focus {
      border-color: $color__primary;
      outline: none !important;
    }
  }

  input {
    font-weight: 500;
    padding: 0.125rem 0.5rem;
    margin: -0.125rem -0.5rem;
    margin-right: 0;
  }

  textarea {
    border-top-left-radius: 0 !important;
    border-top-right-radius: 0 !important;
    display: block;
    margin: -$border-weight;
    min-height: 8rem;
    padding: 0.75rem 1rem;
    resize: none;
    width: calc(100% + 2 * $border-weight);
  }
}

.comment__submit {
  @include button;
  @include button--primary;

  margin-top: 1rem;
  position: absolute;
  right: 0;
  top: 100%;
}
</style>
