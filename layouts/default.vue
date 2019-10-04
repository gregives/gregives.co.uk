<template>
  <div id="__app">
    <script>
      const theme = localStorage.getItem('theme') || 'light'
      document.documentElement.dataset.theme = theme
      document
        .querySelector('meta[name=theme-color]')
        .setAttribute('content', theme === 'light' ? '#33f' : '#333')
      document.documentElement.dataset.menu = 'closed'
      const vh = window.innerHeight * 0.01
      document.documentElement.style.setProperty('--vh', `${vh}px`)
    </script>
    <navbar />
    <nuxt />
    <svg id="__filters" height="0" width="0">
      <defs>
        <filter id="underwater">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.01"
            numOctaves="2"
            result="turbulence"
          ></feTurbulence>
          <feColorMatrix
            in="turbulence"
            type="hueRotate"
            values="0"
            result="animated"
          >
            <animate
              attributeName="values"
              from="0"
              to="360"
              :dur="`${Math.random() + 2}s`"
              repeatCount="indefinite"
            ></animate>
          </feColorMatrix>
          <feDisplacementMap
            in="SourceGraphic"
            in2="animated"
            xChannelSelector="R"
            yChannelSelector="G"
          >
            <animate
              attributeName="scale"
              values="10; 20; 10"
              :dur="`${Math.random() + 7}s`"
              repeatCount="indefinite"
            ></animate>
          </feDisplacementMap>
        </filter>
      </defs>
    </svg>
  </div>
</template>

<script>
import Navbar from '~/components/Navbar'

export default {
  components: {
    Navbar
  }
}
</script>

<style lang="scss">
#__filters {
  position: absolute;
}
</style>
