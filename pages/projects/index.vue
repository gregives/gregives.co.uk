<template>
  <div id="projects" class="container">
    <div v-for="project in projects" :key="project.title">
      <nuxt-link :to="link(project)">
        <h3>{{ title(project) }}</h3>
        <p>{{ project.description }}</p>
      </nuxt-link>
    </div>
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
  display: flex;
  flex-wrap: wrap;
  flex-direction: row;

  > div {
    width: 100%;

    @media (min-width: $break-sm) {
      width: 50%;

      &:nth-child(2n) {
        padding-left: 1rem;
      }

      &:nth-child(2n + 1) {
        padding-right: 1rem;
      }
    }

    @media (min-width: $break-lg) {
      width: 1/3 * 100%;

      &:nth-child(3n) {
        padding-left: 1rem;
        padding-right: 0;
      }

      &:nth-child(3n + 1) {
        padding-left: 0;
        padding-right: 1rem;
      }

      &:nth-child(3n + 2) {
        padding-left: 1rem;
        padding-right: 1rem;
      }
    }

    a {
      padding: 0;
      margin: 0;
      position: relative;
      text-decoration: none;
      white-space: initial;
    }

    p {
      font-size: 90%;
    }
  }
}
</style>
