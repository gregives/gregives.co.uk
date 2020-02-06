<template>
  <footer class="footer">
    <div class="footer__content">
      <p>
        &copy; Greg Ives {{ new Date().getFullYear() }} &mdash;
        <a
          class="footer__source"
          href="https://github.com/gregives/gregives.co.uk"
          rel="noopener noreferrer"
          target="_blank"
        >
          See the source code
        </a>
      </p>
      <p>
        <a class="footer__social-icon" href="mailto:greg@gregives.co.uk">
          <email-icon title="Email" />
        </a>
        <a
          class="footer__social-icon"
          href="https://www.linkedin.com/in/gregiv-es/"
          rel="noopener noreferrer"
          target="_blank"
        >
          <linkedin-icon title="LinkedIn" />
        </a>
        <a
          class="footer__social-icon"
          href="https://github.com/gregives"
          rel="noopener noreferrer"
          target="_blank"
        >
          <github-icon title="GitHub" />
        </a>
        <a
          class="footer__social-icon"
          href="https://devpost.com/gregives"
          rel="noopener noreferrer"
          target="_blank"
        >
          <devpost-icon title="Devpost" />
        </a>
        <a
          class="footer__social-icon"
          href="https://twitter.com/gregiv_es"
          rel="noopener noreferrer"
          target="_blank"
        >
          <twitter-icon title="Twitter" />
        </a>
      </p>
    </div>
  </footer>
</template>

<script>
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
  }
}
</script>

<style lang="scss">
.footer {
  background-color: $color__body;
  box-shadow: $box-shadow;
  color: $color__text--muted;
  font-size: 90%;
  line-height: 2rem;
  padding: 1rem 0;
  width: 100%;

  @media (min-width: $breakpoint--md) {
    padding: 1rem 0;
  }
}

.footer__content {
  @include container;

  display: grid;
  grid-template-columns: 100%;
  grid-gap: 0.5rem;
  text-align: center;

  @media (min-width: $breakpoint--md) {
    grid-template-columns: 1fr 1fr;
    text-align: left;

    > p:last-child {
      text-align: right;
    }
  }
}

.footer__source {
  @include link;
}

.footer__social-icon {
  color: $color__primary--muted;
  padding: 0.5rem 0.25rem;

  &:first-child {
    margin-left: -0.5rem;
  }

  @media (min-width: $breakpoint--md) {
    &:last-child {
      margin-right: -0.5rem;
    }
  }

  &:hover {
    color: $color__primary;
  }

  &[href*='devpost.com'] {
    svg {
      transform: rotate(90deg);
    }
  }
}
</style>
