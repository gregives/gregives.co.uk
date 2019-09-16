<template>
  <div class="home">
    <shapes />
    <div class="container">
      <h1 class="home__title">
        Hi, I'm
        <span class="home__title--primary">Greg Ives</span>
      </h1>
      <p class="home__description">
        I'm a final-year Computer Science student at the University of
        Sheffield. I'm looking for an opportunity in software development from
        <strong>June&nbsp;2020</strong> &mdash; check out my work or
        contact&nbsp;me!
      </p>
      <headshots />
      <p class="home__projects">
        <nuxt-link to="/projects">See my projects</nuxt-link>
      </p>
    </div>
    <svg class="home__filter">
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
import Headshots from '~/components/Headshots'
import Shapes from '~/components/Shapes'

export default {
  components: {
    Headshots,
    Shapes
  },
  mounted() {
    this.$tilt(document.querySelectorAll('[data-tilt]'))
  }
}
</script>

<style lang="scss">
@import '~/assets/sass/_variables';

.home {
  height: 100%;
  overflow-y: hidden;

  .container {
    height: 100%;
  }
}

.home__title {
  font-weight: 500;
  padding-top: 10vh;
  -webkit-text-stroke: 0.2vmin $color--primary;
  -webkit-text-fill-color: transparent;
}

.home__title--primary {
  color: $color--primary;
  filter: url('#underwater');
  font-weight: 900;
  margin-left: 1vw;
  -webkit-text-stroke: transparent;
  -webkit-text-fill-color: $color--primary;
}

.home__description {
  font-size: 120%;
  margin-bottom: 3rem;
  width: 100%;

  @media (min-width: $breakpoint--md) {
    width: 70%;
  }

  @media (min-width: $breakpoint--md) {
    width: 65%;
  }
}

.home__filter {
  display: none;
}

.home__projects {
  font-family: $font--fancy;
  font-size: calc(120% + 1vw);
  font-style: italic;
  font-weight: 500;
}
</style>
