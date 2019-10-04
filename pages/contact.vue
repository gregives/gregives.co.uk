<template>
  <main class="contact">
    <h1 class="contact__title">
      <span class="contact__title--primary">Contact</span> Me
    </h1>
    <div class="contact__layout">
      <div class="contact__text">
        <markdown :vue="vue" />
        <div class="contact__social">
          <a
            class="contact__social-icon contact__social-icon--email"
            href="mailto:greg@gregives.co.uk"
          >
            <email-icon title="Email" />
            Email me for a chat
          </a>
          <a
            class="contact__social-icon contact__social-icon--twitter"
            href="https://twitter.com/_gregives"
          >
            <twitter-icon title="Twitter" />
            I occasionally retweet stuff
          </a>
          <a
            class="contact__social-icon contact__social-icon--github"
            href="https://github.com/gregives"
          >
            <github-icon title="GitHub" />
            Check out my projects
          </a>
          <a
            class="contact__social-icon contact__social-icon--devpost"
            href="https://devpost.com/gregives"
          >
            <devpost-icon title="Devpost" />
            Some of my hackathon submissions
          </a>
        </div>
      </div>
      <div class="contact__form">
        <form
          class="form"
          action="https://formsubmit.co/dea5c6258093cbf621aeec513dcdbaec"
          method="POST"
          @submit.prevent="sendMessage"
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
            <textarea name="message" required @input="autoHeight"></textarea>
            <span>Your message</span>
          </label>
          <button class="form__submit" type="submit" :disabled="message === 1">
            Send message
          </button>
          <span class="form__feedback">
            {{ message === null ? '' : messages[message] }}
          </span>
        </form>
      </div>
    </div>
  </main>
</template>

<script>
import axios from 'axios'
import EmailIcon from 'icons/At'
import TwitterIcon from 'icons/Twitter'
import GithubIcon from 'icons/GithubCircle'
import DevpostIcon from 'icons/HexagonOutline'
import Markdown from '~/components/Markdown'

export default {
  components: {
    Markdown,
    EmailIcon,
    TwitterIcon,
    GithubIcon,
    DevpostIcon
  },
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
  async asyncData() {
    const { vue } = await import('~/contents/contact.md')
    return {
      vue
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
      const formData = new FormData(event.target)
      this.message = 0
      axios
        .post('https://formsubmit.co/ajax/greg@gregives.co.uk', formData)
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
.contact {
  @include page;
}

.contact__title {
  @include title;
}

.contact__title--primary {
  @include title--primary;
}

.contact__layout {
  display: grid;
  grid-gap: 2rem;

  @media (min-width: $breakpoint--lg) {
    grid-template-columns: 1fr 1fr;
    grid-gap: calc(1rem + 5vmin);
  }
}

.contact__social {
  margin-top: 2rem;
}

.contact__social-icon {
  display: block;
  transition: color 150ms ease-out;

  &:hover {
    color: $color--primary;
  }

  span {
    display: inline-block;
    margin-right: 1rem;
    vertical-align: middle;
  }

  svg {
    height: 2rem;
    width: 2rem;
  }

  &--devpost {
    svg {
      transform: rotate(90deg);
    }
  }
}

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
    background: $color--body;
    border-radius: $border-radius;
    border: 2px solid $color--primary-muted;
    color: $color--text;
    display: block;
    font-family: $font--body;
    font-size: 100%;
    padding: 1rem;
    padding-bottom: 0.75rem;
    resize: none;
    transition: background-color 150ms ease-out, border-color 150ms ease-out;
    width: 100%;

    &:focus {
      border-color: $color--primary;
      outline: none !important;

      ~ span {
        color: $color--primary;
      }
    }
  }

  textarea {
    min-height: 8rem;
  }

  span {
    background: $color--body;
    bottom: 100%;
    color: $color--text-muted;
    left: 0;
    margin-bottom: -0.75rem;
    margin-left: calc(0.5rem + 2px);
    padding: 0 0.5rem;
    position: absolute;
  }

  &:not(:last-child) {
    margin-bottom: 1.5rem;
  }
}

.form__submit {
  background-color: transparent;
  border-radius: $border-radius;
  border: 2px solid $color--primary;
  color: $color--primary;
  cursor: pointer;
  font-size: 120%;
  font-family: $font--fancy;
  padding: 0.5rem 1rem;
  position: relative;
  transition: color 150ms ease-out;

  &::before {
    background-color: $color--primary;
    content: '';
    height: 100%;
    left: 0;
    position: absolute;
    top: 0;
    transform: scaleX(0);
    transform-origin: left;
    transition: transform 150ms ease-out, opacity 150ms ease;
    width: 100%;
    z-index: -1;
  }

  &:hover,
  &:focus {
    color: $color--body;
    outline: none !important;

    &::before {
      transform: none;
    }
  }

  &[disabled] {
    cursor: not-allowed;
    opacity: 0.5;
  }
}

.form__feedback {
  margin-left: 0.5rem;
}
</style>
