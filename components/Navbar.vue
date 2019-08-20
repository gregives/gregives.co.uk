<template>
  <header>
    <div class="container">
      <span>
        <nuxt-link to="/">Greg Ives</nuxt-link>
      </span>
      <hamburger />
      <nav>
        <shapes />
        <ol>
          <li>
            <nuxt-link to="/">Home</nuxt-link>
          </li>
          <li>
            <nuxt-link to="/projects">Projects</nuxt-link>
          </li>
          <li>
            <nuxt-link to="/work">Work</nuxt-link>
          </li>
          <li>
            <nuxt-link to="/about">About</nuxt-link>
          </li>
          <li>
            <nuxt-link to="/contact">Contact</nuxt-link>
          </li>
        </ol>
      </nav>
    </div>
  </header>
</template>

<script>
import Hamburger from '~/components/Hamburger'
import Shapes from '~/components/Shapes'

export default {
  components: {
    Hamburger,
    Shapes
  }
}
</script>

<style lang="scss">
@import '~/assets/sass/_variables';

header {
  clear: both;
  padding: 2rem 0;
  z-index: 1;

  .container > span {
    display: inline-block;
    font-family: $header-font;
    font-size: 120%;

    a::before,
    a::after {
      display: none;
    }
  }

  nav {
    background-color: darken(white, 5%);
    left: 0;
    height: 100%;
    overflow: hidden;
    position: fixed;
    top: 0;
    transform: translateX(100%);
    transition: transform 300ms ease;
    width: 100%;
    z-index: -1;

    .shapes {
      transform: translateX(-100%);
      opacity: 0;
      transition: transform 300ms ease, opacity 300ms ease;
    }

    ol {
      counter-reset: navbar-links;
      left: calc(50% + 4vmin);
      position: absolute;
      top: 50%;
      transform: translate(-50%, -50%);

      li {
        counter-increment: navbar-links;
        position: relative;
        font-size: 150%;

        ~ li {
          margin-top: 5vmin;
        }

        &::before {
          color: transparentize($color: #000000, $amount: 0.63);
          content: '0' counter(navbar-links);
          font-size: 60%;
          position: absolute;
          right: calc(100% + 4vmin);
          top: 1vmin;
        }
      }
    }

    @media (min-width: $break-lg) {
      background-color: transparent;
      float: right;
      height: auto;
      margin-top: 0.2rem;
      overflow: visible;
      position: relative;
      transform: none;
      width: auto;
      z-index: auto;

      .shapes {
        display: none;
      }

      ol {
        left: auto;
        position: relative;
        top: auto;
        transform: none;

        li {
          display: inline-block;
          font-size: 90%;

          ~ li {
            margin-left: 7vmin;
            margin-top: auto;
          }

          &::before {
            right: calc(100% + 1vmin);
            top: 0.5vmin;
          }
        }
      }
    }
  }
}

:root[data-menu] header nav {
  transform: none;
  transition: transform 400ms ease;

  .shapes {
    opacity: 1;
    transform: none;
    transition: transform 400ms ease, opacity 400ms 200ms ease;
  }
}
</style>
