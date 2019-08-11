<template>
  <header>
    <div class="container">
      <span id="logo">Greg Ives</span>
      <nav>
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

<style lang="scss">
@import '~/assets/sass/_variables';

header {
  clear: both;

  #logo {
    font-family: $header-font;
  }

  nav {
    float: right;

    ol {
      counter-reset: navbar-links;

      li {
        counter-increment: navbar-links;
        display: inline-block;
        font-size: 80%;

        &::before {
          content: '0' counter(navbar-links);
          font-size: 60%;
        }
      }
    }
  }
}
</style>
