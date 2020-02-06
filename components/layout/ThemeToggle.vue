<template>
  <button
    :aria-label="theme === 'light' ? 'Dark theme' : 'Light theme'"
    :title="theme === 'light' ? 'Dark theme' : 'Light theme'"
    @click="toggleTheme"
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
      theme: 'light'
    }
  },
  computed: {
    color() {
      if (process.server) return false

      const color = this.theme === 'light' ? 'primary' : 'body--overlay'
      return getComputedStyle(document.documentElement)
        .getPropertyValue(`--color__${color}`)
        .trim()
    }
  },
  watch: {
    theme(theme) {
      localStorage.setItem('theme', theme)
      document.documentElement.dataset.theme = theme
      document.querySelector('meta[name="theme-color"]').content = this.color
    }
  },
  mounted() {
    this.theme = localStorage.getItem('theme') || 'light'
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
}
</style>
