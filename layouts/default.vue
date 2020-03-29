<template>
  <div id="__app">
    <script v-html="script"></script>
    <div id="__wrapper" ref="wrapper">
      <top-bar />
      <nuxt />
      <bottom-bar />
      <blobs />
    </div>
  </div>
</template>

<script>
import TopBar from '~/components/layout/TopBar'
import BottomBar from '~/components/layout/BottomBar'
import Blobs from '~/components/layout/Blobs'

export default {
  components: {
    TopBar,
    BottomBar,
    Blobs
  },
  data() {
    return {
      script: (() => {
        const content = function() {
          // Set theme and theme-color as soon as possible
          const theme = localStorage.getItem('theme') || 'light'
          document.documentElement.dataset.theme = theme

          const color = getComputedStyle(
            document.documentElement
          ).getPropertyValue(
            theme === 'light' ? '--color__primary' : '--color__body--overlay'
          )
          document
            .querySelector('meta[name="theme-color"]')
            .setAttribute('content', color.trim())

          // Set menu to closed
          document.documentElement.dataset.menu = 'closed'

          // Update VH units for Android
          const updateVH = () => {
            const vh = (document.documentElement.clientHeight / 100).toFixed(3)
            document.documentElement.style.setProperty('--vh', `${vh}px`)
          }
          window.addEventListener('resize', updateVH)
          updateVH()

          // Remove data-n-head
          delete document.documentElement.dataset.nHead
        }
        return `(${content.toString()})()`
      })()
    }
  },
  watch: {
    '$route.path'(...args) {
      setTimeout(() => {
        this.$refs.wrapper.scrollTo(0, 0)
      }, 800)
    }
  },
  mounted() {
    // Disable install prompt for PWA
    window.addEventListener('beforeinstallprompt', (event) => {
      event.preventDefault()
    })

    // Check if the page should scroll to hash
    const hash = this.$route.hash
    if (hash) {
      this.scrollToHash(hash)
    }
  },
  methods: {
    scrollToHash(hash) {
      this.$nextTick(() => {
        location.href = hash
      })
    }
  }
}
</script>

<style lang="scss">
#__wrapper {
  height: 100vh;
  height: calc(var(--vh, 1vh) * 100);
  overflow-y: scroll;
  overflow-x: hidden;
}
</style>
