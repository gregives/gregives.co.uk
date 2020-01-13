<template>
  <main class="contact">
    <h1 class="contact__title">
      <span class="contact__title--primary">Contact</span> Me
    </h1>
    <div class="contact__layout">
      <div class="contact__text">
        <markdown :vue="vue" />
        <div class="contact__social">
          <div class="contact__social-item">
            <a
              class="contact__social-icon contact__social-icon--email"
              href="mailto:greg@gregives.co.uk"
            >
              <email-icon title="Email" />
              <span class="contact__social-text">Email me for a chat</span>
            </a>
          </div>
          <div class="contact__social-item">
            <a
              class="contact__social-icon contact__social-icon--linkedin"
              href="https://www.linkedin.com/in/gregiv-es/"
            >
              <linkedin-icon title="LinkedIn" />
              <span class="contact__social-text">Connect with me</span>
            </a>
          </div>
          <div class="contact__social-item">
            <a
              class="contact__social-icon contact__social-icon--github"
              href="https://github.com/gregives"
            >
              <github-icon title="GitHub" />
              <span class="contact__social-text">Check out my projects</span>
            </a>
          </div>
          <div class="contact__social-item">
            <a
              class="contact__social-icon contact__social-icon--devpost"
              href="https://devpost.com/gregives"
            >
              <devpost-icon title="Devpost" />
              <span class="contact__social-text">Hackathon submissions</span>
            </a>
          </div>
          <div class="contact__social-item">
            <a
              class="contact__social-icon contact__social-icon--twitter"
              href="https://twitter.com/gregiv_es"
            >
              <twitter-icon title="Twitter" />
              <span class="contact__social-text">Follow me on Twitter</span>
            </a>
          </div>
        </div>
      </div>
      <div class="contact__form">
        <form
          @submit.prevent="sendMessage"
          class="form"
          action="https://formsubmit.co/dea5c6258093cbf621aeec513dcdbaec"
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
import EmailIcon from 'icons/EmailVariant'
import TwitterIcon from 'icons/Twitter'
import GithubIcon from 'icons/GithubCircle'
import DevpostIcon from 'icons/HexagonOutline'
import LinkedinIcon from 'icons/LinkedinBox'

export default {
  components: {
    EmailIcon,
    TwitterIcon,
    GithubIcon,
    DevpostIcon,
    LinkedinIcon
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
  },
  head() {
    return {
      title: 'Contact'
    }
  }
}
</script>

<style lang="scss">
.contact {
  $clip-path: polygon(100% 30%, 70% 25%, 50% 60%, 80% 100%, 100% 100%);
  @include page;
  @include dots($clip-path);
}

.contact__title {
  @include title;

  text-shadow: 0.125rem 0.125rem $color__primary--muted;
}

.contact__title--primary {
  @include title--primary;
}

.contact__layout {
  display: grid;
  grid-template-columns: 100%;
  grid-gap: 3rem;

  @media (min-width: $breakpoint--lg) {
    grid-template-columns: 1fr 1fr;
  }
}

.contact__social {
  margin-top: 2rem;
}

.contact__social-item {
  ~ .contact__social-item {
    margin-top: 0.5rem;
  }
}

.contact__social-icon {
  transition: color 150ms ease-out;

  &:hover {
    color: $color__primary;

    .contact__social-text {
      @include link--active;
    }
  }

  span {
    margin-right: 1rem;
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

.contact__social-text {
  @include link;
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
    background: $color__body--overlay;
    border-radius: $border-radius;
    border: $border-weight solid $color__primary--muted;
    box-shadow: $box-shadow--small;
    color: $color__text;
    display: block;
    padding: 1rem;
    padding-bottom: 0.75rem;
    resize: none;
    transition: background-color 150ms ease-out, border-color 150ms ease-out;
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
