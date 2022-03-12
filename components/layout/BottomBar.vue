<template>
  <footer class="footer">
    <div class="footer__content">
      <p>
        &copy; Greg Ives {{ new Date().getFullYear() }}
        <a
          class="footer__source"
          href="https://github.com/gregives/gregives.co.uk"
        >
          Source code
        </a>
      </p>
      <p><view-counter /></p>
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
import LinkedinIcon from 'icons/Linkedin'
import ViewCounter from '~/components/ViewCounter'

export default {
  components: {
    EmailIcon,
    TwitterIcon,
    GithubIcon,
    LinkedinIcon,
    ViewCounter
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
  position: relative;
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
  text-align: center;

  @media (min-width: $breakpoint--md) {
    grid-template-columns: minmax(0, 1fr) minmax(0, 1fr) minmax(0, 1fr);
    text-align: center;

    > :first-child {
      text-align: left;
    }

    > :last-child {
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

  &:hover,
  &:focus {
    color: $color__primary;
  }
}
</style>
