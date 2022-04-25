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
        ref="comment"
        name="text"
        required
        placeholder="Join the conversation"
        @input="autoHeight"
      ></textarea>
    </div>
    <div class="comment__markdown">
      <button
        class="comment__markdown-button"
        type="button"
        title="Bold"
        @click="addBold"
      >
        <strong>B</strong>
      </button>
      <button
        class="comment__markdown-button"
        type="button"
        title="Italic"
        @click="addItalic"
      >
        <em>&#42926;</em>
      </button>
      <button
        class="comment__markdown-button"
        type="button"
        title="Strikethrough"
        @click="addStrikethrough"
      >
        <s>S</s>
      </button>
      <button
        class="comment__markdown-button"
        type="button"
        title="Link"
        @click="addLink"
      >
        <link-icon :size="18" />
      </button>
      <span class="comment__markdown-divider" />
      <button
        class="comment__markdown-button"
        type="button"
        title="Quote"
        @click="addQuote"
      >
        <quote-icon />
      </button>
      <button
        class="comment__markdown-button"
        type="button"
        title="Bullet list"
        @click="addBulletList"
      >
        <bullet-list-icon :size="18" />
      </button>
      <button
        class="comment__markdown-button"
        type="button"
        title="Number list"
        @click="addNumberList"
      >
        <number-list-icon :size="18" />
      </button>
      <button
        class="comment__markdown-button"
        type="button"
        title="Code block"
        @click="addCodeBlock"
      >
        <code-block-icon :size="18" />
      </button>
    </div>
    <recaptcha />
    <button class="comment__submit" type="submit">Comment</button>
  </form>
</template>

<script>
import LinkIcon from 'icons/LinkVariant'
import QuoteIcon from 'icons/FormatQuoteClose'
import BulletListIcon from 'icons/FormatListBulleted'
import NumberListIcon from 'icons/FormatListNumbered'
import CodeBlockIcon from 'icons/CodeTags'

export default {
  components: {
    LinkIcon,
    QuoteIcon,
    BulletListIcon,
    NumberListIcon,
    CodeBlockIcon
  },
  methods: {
    autoHeight() {
      const textarea = this.$refs.comment
      const borders = textarea.offsetHeight - textarea.clientHeight
      textarea.style.height = 0
      textarea.style.height = textarea.scrollHeight + borders + 'px'
    },
    addBold() {
      this.surroundText('**')
    },
    addItalic() {
      this.surroundText('_')
    },
    addStrikethrough() {
      this.surroundText('~')
    },
    addLink() {
      this.surroundText('[', '](https://)')
    },
    addQuote() {
      this.surroundText('> ', '', true)
    },
    addBulletList() {
      this.surroundText('- ', '', true)
    },
    addNumberList() {
      this.surroundText('1. ', '', true)
    },
    addCodeBlock() {
      this.surroundText('```\n', '\n```', true)
    },
    surroundText(
      surroundStart,
      surroundEnd = surroundStart,
      blockLevel = false
    ) {
      const textarea = this.$refs.comment
      const { selectionStart, selectionEnd, value } = textarea

      // Text before start of selection or start of line for block level
      const startOfLine = value.lastIndexOf('\n', selectionStart - 1)
      const textBefore = blockLevel
        ? value.substring(0, startOfLine === -1 ? 0 : startOfLine + 1)
        : value.substring(0, selectionStart)

      // Text after end of selection or end of line for block level
      const endOfLine = value.indexOf('\n', selectionEnd)
      const textAfter = blockLevel
        ? value.substring(endOfLine === -1 ? value.length : endOfLine)
        : value.substring(selectionEnd)

      const textToSurround = value.substring(
        textBefore.length,
        value.length - textAfter.length
      )

      // Create new value
      textarea.value =
        textBefore + surroundStart + textToSurround + surroundEnd + textAfter

      // Update the selection
      textarea.selectionStart = selectionStart + surroundStart.length
      textarea.selectionEnd = selectionEnd + surroundStart.length
      this.autoHeight()
      textarea.focus()
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

        // Show new comment
        this.$emit('submit', Object.fromEntries(formData.entries()))
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
    border-radius: 0 !important;
    display: block;
    margin: -$border-weight;
    min-height: 8rem;
    padding: 0.75rem 1rem;
    resize: none;
    width: calc(100% + 2 * $border-weight);
  }
}

.comment__markdown {
  display: flex;
  padding: 0.5rem;

  &-button {
    background-color: $color__body;
    border: $border-weight solid transparent;
    border-radius: $border-radius;
    cursor: pointer;
    line-height: 1.75rem;
    margin-right: 0.35rem;
    position: relative;
    transition: filter 150ms $transition__normal;
    width: 1.75rem;

    .material-design-icon {
      display: block;
      left: 50%;
      top: 0;
      transform: translateX(-50%);
      position: absolute;
    }

    &:hover,
    &:focus {
      filter: brightness(0.9);
    }

    &:focus {
      border-color: $color__primary;
      outline: none !important;
    }
  }

  &-divider {
    margin: 0 0.35rem;
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
