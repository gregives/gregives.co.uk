<template>
  <div class="container">
    <ol id="projects">
      <li v-for="project in projects" :key="project.title">
        <nuxt-link :to="link(project)">
          <div>
            <h3>{{ title(project) }}</h3>
            <p>{{ project.description }}</p>
          </div>
        </nuxt-link>
      </li>
    </ol>
  </div>
</template>

<script>
import androidApps from './android-apps'
import autoClicker from './auto-clicker'
import cisco from './cisco'
import dissertation from './dissertation'
import festimap from './festimap'

export default {
  data() {
    return {
      projects: [
        androidApps.data(),
        autoClicker.data(),
        cisco.data(),
        dissertation.data(),
        festimap.data()
      ]
    }
  },
  methods: {
    title(project) {
      return project.shortTitle || project.title
    },
    link(project) {
      return (
        '/projects/' +
        this.title(project)
          .toLowerCase()
          .replace(' ', '-')
      )
    }
  }
}
</script>

<style lang="scss">
@import '~/assets/sass/_variables';

#projects {
  display: grid;
  grid-template-columns: 1fr;
  grid-gap: 2.5rem;

  @media (min-width: $break-sm) {
    grid-template-columns: 1fr 1fr;
  }

  @media (min-width: $break-lg) {
    grid-template-columns: 1fr 1fr 1fr;
  }

  li {
    margin: -1rem;
    padding: 0rem;
    position: relative;

    > a {
      display: block;
      margin: 0;
      padding: 1.5rem;
      white-space: initial;

      &::after {
        display: none;
      }

      &::before {
        background: none;
        border: solid 2px transparentize(black, 0.95);
        box-sizing: content-box;
        content: '';
        height: calc(100% - 1rem);
        left: 0.5rem;
        position: absolute;
        transition: border 150ms ease;
        top: 0.5rem;
        width: calc(100% - 1rem);
      }

      &:hover::before {
        border: solid 2px transparentize(black, 0.9);
      }

      > div {
        height: 100%;
        width: 100%;
      }
    }

    @for $i from 1 through 5 {
      &:nth-child(#{$i}) > a::before,
      &:nth-child(#{$i}) > a::after {
        transform: rotate(#{random() * 4 - 2}deg);
      }
    }
  }

  p {
    font-size: 90%;
  }
}
</style>
