<template>
  <div class="container">
    <div v-for="project in projects" :key="project.title">
      <h3>{{ title(project) }}</h3>
      <nuxt-link :to="link(project)">Read more</nuxt-link>
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

<style lang="scss" scoped>
.container {
  display: flex;
  flex-wrap: wrap;

  > div {
    width: 100%;
  }
}
</style>
