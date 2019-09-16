<template>
  <div class="home">
    <shapes />
    <div class="container">
      <div class="home__hero">
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
        <div class="home__projects">
          <nuxt-link to="/projects" class="home__projects-link">
            <em>See my projects</em>
          </nuxt-link>
        </div>
      </div>
    </div>
    <svg class="home__filter">
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
              :dur="`${Math.random() + 5}s`"
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
              values="20; 30; 20"
              :dur="`${Math.random() + 9}s`"
              repeatCount="indefinite"
            ></animate>
          </feDisplacementMap>
        </filter>
      </defs>
    </svg>
  </div>
</template>

<script>
import Shapes from '~/components/Shapes'

export default {
  components: {
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

.home__hero {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
}

.home__title {
  font-size: 10vw;
  font-weight: 500;
  -webkit-text-stroke: 0.2vmin black;
  -webkit-text-fill-color: transparent;

  @media (min-width: $breakpoint--xl) {
    font-size: #{$breakpoint--xl * 10 / 100};
  }
}

.home__title--primary {
  color: $color--primary;
  filter: url('#underwater');
  font-size: 11vw;
  font-weight: 900;
  margin-left: 1vw;
  -webkit-text-stroke: transparent;
  -webkit-text-fill-color: $color--primary;

  @media (min-width: $breakpoint--xl) {
    font-size: #{$breakpoint--xl * 11 / 100};
  }
}

.home__description {
  font-size: 120%;
  margin-bottom: 5rem;
  width: 100%;
}

.home__filter {
  display: none;
}

.home__projects {
  color: $color--primary;
  font-family: $font--fancy;
  font-size: calc(120% + 1vw);
  text-align: right;
}

.home__projects-link {
  display: inline-block;

  &::after {
    animation: bounce 3s infinite;
    content: '\2192';
    display: inline-block;
    margin-left: 2rem;
  }

  @keyframes bounce {
    0% {
      transform: none;
    }
    5% {
      transform: translateX(-1rem) scaleX(0.9);
    }
    10% {
      transform: none;
    }
    15% {
      transform: translateX(-1rem) scaleX(0.9);
    }
    20% {
      transform: none;
    }
  }
}
</style>
