<template>
  <div class="error">
    <client-only>
      <h1 v-if="statusCode === 404" class="error__title">
        Page <span class="error__title--primary">Not Found</span>
      </h1>
      <h1 v-else class="error__title">
        An <span class="error__title--primary">Error</span> Occurred
      </h1>
    </client-only>
    <p class="error__message">
      If you think there's something wrong with my website, please could you
      <nuxt-link to="/contact">let me know</nuxt-link>? Otherwise you can head
      back over to the home page!
    </p>
    <nuxt-link to="/" class="error__safety">Take me to safety</nuxt-link>
    <picture v-show="statusCode === 404" class="error__headshot">
      <source :srcset="head.webp" type="image/webp" />
      <source :srcset="head.png" type="image/png" />
      <img :src="head.png" alt="Greg Ives looking worried" />
    </picture>
  </div>
</template>

<script>
export default {
  props: {
    error: {
      type: Object,
      default: null
    }
  },
  data() {
    return {
      head: {
        png: require('~/assets/images/error.png'),
        webp: require('~/assets/images/error.png?webp')
      }
    }
  },
  computed: {
    statusCode() {
      return (this.error && this.error.statusCode) || 500
    }
  }
}
</script>

<style lang="scss">
.error {
  $clip-path: polygon(0% 90%, 100% 50%, 100% 90%, 70% 100%, 0% 100%);
  @include page;
  @include dots($clip-path);
}

.error__title {
  @include title;
}

.error__title--primary {
  @include title--primary;
}

.error__message {
  margin-bottom: 3rem;
  width: 100%;

  @media (min-width: $breakpoint--md) {
    width: 70%;
  }

  @media (min-width: $breakpoint--md) {
    width: 60%;
  }
}

.error__safety {
  @include button;
  @include button--primary;
}

.error__headshot {
  bottom: 0;
  filter: sepia(1) hue-rotate(-45deg) hue-rotate($color--primary-hue)
    saturate(1.5);
  height: calc(20vh + 30vw);
  overflow-y: hidden;
  pointer-events: none;
  position: absolute;
  right: 0;
  width: calc(15vh + 22.5vw); // Aspect ratio of 4:3

  @media (min-width: $breakpoint--xl) {
    height: calc(20vh + #{30 / 100 * $breakpoint--xl});
    width: calc(15vh + #{22.5 / 100 * $breakpoint--xl});
  }
}

:root[data-theme='dark'] .error__headshot {
  filter: invert(0.5) sepia(1) hue-rotate(-45deg)
    hue-rotate($color--primary-hue) brightness(0.5) saturate(3);
}
</style>
