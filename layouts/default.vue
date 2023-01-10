<template>
  <div id="__wrapper" ref="wrapper">
    <script v-html="script"></script>
    <top-bar />
    <nuxt />
    <bottom-bar />
    <svg-filters />
  </div>
</template>

<script>
import { hydrateNever } from 'vue-lazy-hydration'
import TopBar from '~/components/layout/TopBar'
import BottomBar from '~/components/layout/BottomBar'

export default {
  components: {
    TopBar,
    BottomBar,
    SvgFilters: hydrateNever(() => import('~/components/layout/SVGFilters'))
  },
  data() {
    return {
      script: (() => {
        const content = function () {
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
  mounted() {
    // Disable install prompt for PWA
    window.addEventListener('beforeinstallprompt', (event) => {
      event.preventDefault()
    })
  }
}
</script>

<style lang="scss">
#__wrapper {
  display: flex;
  flex-direction: column;
}

#__wrapper > svg {
  @include visually-hidden;
}

.page-enter-active {
  transition: opacity 250ms $transition__normal--in;

  ~ .footer {
    transition: opacity 250ms $transition__normal--in;
  }
}

.page-leave-active {
  transition: opacity 250ms $transition__normal--out;

  ~ .footer {
    transition: opacity 250ms $transition__normal--out;
  }
}

.page-enter,
.page-leave-active {
  opacity: 0;

  ~ .footer {
    opacity: 0;
  }
}
</style>
