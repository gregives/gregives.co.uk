<template>
  <div id="__app">
    <script>
      const theme = localStorage.getItem('theme') || 'light'
      document.documentElement.dataset.theme = theme
      document
        .querySelector('meta[name=theme-color]')
        .setAttribute('content', theme === 'light' ? '#33c' : '#222')
      document.documentElement.dataset.menu = 'closed'
    </script>
    <navbar />
    <nuxt />
    <svg height="0" width="0">
      <defs>
        <filter id="underwater">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.01"
            numOctaves="3"
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
              :dur="`${Math.random() + 3}s`"
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
#__layout > div {
  height: 100%;
  display: flex;
  flex-direction: column;

  > main {
    flex: 1;
  }
}
</style>
