<template>
  <button
    :aria-label="theme === 'light' ? 'Dark theme' : 'Light theme'"
    @click="toggleTheme"
    :class="{ 'theme-toggle--splash': splash }"
    class="theme-toggle"
  >
    <moon-icon v-if="theme === 'light'" title="Dark theme" />
    <sun-icon v-else title="Light theme" />
  </button>
</template>

<script>
import SunIcon from 'icons/WhiteBalanceSunny'
import MoonIcon from 'icons/WeatherNight'

export default {
  components: {
    SunIcon,
    MoonIcon
  },
  data() {
    return {
      splash: false,
      theme: (process.client && localStorage.getItem('theme')) || 'light'
    }
  },
  computed: {
    color() {
      if (process.server) return false
      return getComputedStyle(document.documentElement)
        .getPropertyValue(
          this.theme === 'light' ? '--color__primary' : '--color__body--overlay'
        )
        .trim()
    }
  },
  head() {
    return {
      meta: [{ hid: 'theme-color', name: 'theme-color', content: this.color }]
    }
  },
  watch: {
    theme(theme) {
      document.documentElement.dataset.theme = theme
      localStorage.setItem('theme', theme)
      this.splash = true
    }
  },
  mounted() {
    this.$el.addEventListener('animationend', () => (this.splash = false))
  },
  methods: {
    toggleTheme() {
      this.theme = this.theme === 'light' ? 'dark' : 'light'
    }
  }
}
</script>

<style lang="scss">
.theme-toggle {
  background-color: transparent;
  border: none;
  color: $color__text;
  cursor: pointer;
  outline: none;
  margin: 0 -0.5rem;
  margin-right: 1rem;
  padding: 0 0.5rem;
  position: relative;

  svg {
    margin-top: -0.25rem;
  }

  &:hover {
    color: $color__primary;
  }

  @media (min-width: $breakpoint--md) {
    margin-right: -0.5rem;
    margin-left: 1rem;
  }

  @keyframes splashDown {
    from {
      transform: translateY(-100%);
    }

    to {
      transform: translateY(0);
    }
  }

  @keyframes splashLeft {
    from {
      transform: translateX(100%);
    }

    to {
      transform: translateX(0);
    }
  }

  &::after {
    backdrop-filter: invert(1) contrast(0.5) sepia(1) hue-rotate(-45deg)
      hue-rotate($color__primary--hue);
    content: '';
    height: 100vh;
    right: 0;
    position: fixed;
    top: 100%;
    width: 100vw;
    z-index: 1000000;
    -webkit-tap-highlight-color: transparent;

    @media (min-width: $breakpoint--md) {
      top: 0;
      right: 100%;
    }
  }

  &--splash::after {
    animation: splashDown 600ms $transition__snappy;

    @media (min-width: $breakpoint--md) {
      animation: splashLeft 600ms $transition__snappy;
    }
  }
}
</style>
