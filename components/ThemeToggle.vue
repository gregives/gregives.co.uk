<template>
  <client-only>
    <button
      class="theme-toggle"
      :aria-label="theme === 'light' ? 'Dark theme' : 'Light theme'"
      :title="theme === 'light' ? 'Dark theme' : 'Light theme'"
      @click="toggleTheme"
    >
      <moon-icon v-if="theme === 'light'" title="Dark theme" />
      <sun-icon v-else title="Light theme" />
    </button>
  </client-only>
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
      return getComputedStyle(document.documentElement)
        .getPropertyValue(
          this.theme === 'light' ? '--color--primary' : '--color--body-overlay'
        )
        .trim()
    }
  },
  head() {
    return process.client
      ? {
          meta: [
            { hid: 'theme-color', name: 'theme-color', content: this.color }
          ]
        }
      : {}
  },
  watch: {
    theme() {
      document.documentElement.dataset.theme = this.theme
      localStorage.setItem('theme', this.theme)
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
  background: none;
  border: none;
  color: $color--text;
  cursor: pointer;
  float: right;
  margin-right: 2rem;
  outline: none;
  transition: color 150ms ease-out;

  svg {
    margin-top: -0.25rem;
  }

  &:hover {
    color: $color--primary;
  }

  @media (min-width: $breakpoint--lg) {
    margin-right: -0.5rem;
    margin-left: 1.5rem;
  }
}
</style>
