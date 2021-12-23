<template>
  <footer class="footer">
    <div class="footer__content">
      <p>
        &copy; Greg Ives {{ new Date().getFullYear() }}
        <a
          class="footer__source"
          href="https://github.com/gregives/gregives.co.uk"
        >
          See the source code
        </a>
      </p>
      <p>
        <a
          class="footer__social-icon"
          href="mailto:greg@gregives.co.uk"
          title="Email"
        >
          <email-icon title="Email" />
        </a>
        <a
          class="footer__social-icon"
          href="https://www.linkedin.com/in/gregiv-es/"
          title="LinkedIn"
        >
          <linkedin-icon title="LinkedIn" />
        </a>
        <a
          class="footer__social-icon"
          href="https://github.com/gregives"
          title="GitHub"
        >
          <github-icon title="GitHub" />
        </a>
        <a
          class="footer__social-icon"
          href="https://devpost.com/gregives"
          title="Devpost"
        >
          <devpost-icon title="Devpost" />
        </a>
        <a
          class="footer__social-icon"
          href="https://twitter.com/gregiv_es"
          title="Twitter"
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
import GithubIcon from 'icons/Github'
import DevpostIcon from 'icons/HexagonOutline'
import LinkedinIcon from 'icons/Linkedin'

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
  padding: 0.75rem 0 1rem;
  width: 100%;

  @media (min-width: $breakpoint--md) {
    padding: 0.75rem 0;
  }

  @media print {
    display: none;
  }
}

.footer__content {
  @include container;

  display: grid;
  grid-template-columns: 100%;
  grid-gap: 0.25rem;
  text-align: center;

  @media (min-width: $breakpoint--md) {
    grid-template-columns: minmax(0, 1fr) minmax(0, 1fr);
    text-align: left;

    > p:last-child {
      text-align: right;
    }
  }
}

.footer__source {
  @include link;

  margin-left: 1rem;
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
    .material-design-icon svg {
      transform: rotate(90deg);
    }
  }
}
</style>
