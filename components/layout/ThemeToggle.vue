<template>
  <button
    :aria-label="theme === 'light' ? 'Dark theme' : 'Light theme'"
    class="theme-toggle"
    @click="toggleTheme"
  >
    <moon-icon v-if="theme === 'light'" title="Dark theme" />
    <sun-icon v-else title="Light theme" />
  </button>
</template>

<script>
import SunIcon from 'icons/WhiteBalanceSunny'
import MoonIcon from 'icons/MoonWaningCrescent'

export default {
  components: {
    SunIcon,
    MoonIcon
  },
  data() {
    return {
      theme: (process.client && localStorage.getItem('theme')) || 'light'
    }
  },
  head() {
    if (!process.server) {
      return {
        meta: [{ hid: 'theme-color', name: 'theme-color', content: this.color }]
      }
    }
  },
  computed: {
    color() {
      const color = this.theme === 'light' ? 'primary' : 'body--overlay'
      return getComputedStyle(document.documentElement)
        .getPropertyValue(`--color__${color}`)
        .trim()
    }
  },
  watch: {
    theme(theme) {
      document.documentElement.dataset.theme = theme
      localStorage.setItem('theme', theme)
    }
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
  color: $color__primary;
  cursor: pointer;
  outline: none;
  margin: 0 -0.5rem;
  margin-right: 1rem;
  padding: 0 0.5rem;
  position: relative;

  svg {
    margin-top: -0.25rem;
    transform: scale(0.9) rotate(-45deg);
  }

  @media (min-width: $breakpoint--md) {
    margin-right: -0.5rem;
    margin-left: 1rem;
  }
}
</style>
