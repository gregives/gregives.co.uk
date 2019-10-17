<template>
  <footer class="footer">
    <div class="footer__content">
      <p class="footer__notice">
        &copy; {{ new Date().getFullYear() }} &mdash;
        <a href="https://github.com/gregives/gregives.co.uk">
          coded by Greg Ives using Nuxt
        </a>
      </p>
      <p class="footer__back-to-top">
        <a v-scroll-to="'#__nuxt'" href="#">
          Back to top
        </a>
      </p>
    </div>
  </footer>
</template>

<style lang="scss">
.footer {
  background-color: $color--body-overlay;
  box-shadow: $box-shadow;
  color: $color--text-muted;
  font-size: smaller;
  padding: 1rem 0;
  position: relative;
  z-index: 1;
}

.footer__content {
  @include container;
}

.footer__notice {
  display: inline-block;
}

.footer__back-to-top {
  float: right;
}
</style>
