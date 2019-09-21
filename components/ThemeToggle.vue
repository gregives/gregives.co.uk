<template>
  <button
    class="theme-toggle"
    :aria-label="theme === 'light' ? 'Dark theme' : 'Light theme'"
    :title="theme === 'light' ? 'Dark theme' : 'Light theme'"
    @click="toggleTheme"
  >
    {{ theme === 'light' ? '🌛' : '🌞' }}
  </button>
</template>

<script>
export default {
  data() {
    return {
      theme: 'light'
    }
  },
  mounted() {
    this.theme = document.documentElement.dataset.theme || 'light'
    localStorage.setItem('theme', this.theme)
  },
  methods: {
    toggleTheme() {
      this.theme = this.theme === 'light' ? 'dark' : 'light'
      document.documentElement.dataset.theme = this.theme
      localStorage.setItem('theme', this.theme)
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
  filter: saturate(0);
  float: right;
  font-size: 110%;
  height: 2rem;
  line-height: 2rem;
  margin-right: 2rem;
  outline: none;
  padding: 0 0.5rem;
  text-align: center;
  transition: filter 150ms ease-out, opacity 150ms ease-out;
  width: 2rem;

  &:hover {
    filter: saturate(0.4);
  }

  @media (min-width: $breakpoint--lg) {
    font-size: 100%;
    margin-right: -0.5rem;
    text-align: right;
    width: 3rem;
  }
}

:root[data-theme='dark'] .theme-toggle:hover {
  filter: saturate(1);
}
</style>
