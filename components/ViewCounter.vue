<template>
  <span v-if="!$fetchState.error && views">{{ views }} views</span>
</template>

<script>
export default {
  data() {
    return {
      views: null
    }
  },
  async fetch() {
    const { views } = await this.$dynamic(this.$route.path)
    this.views = views
  },
  watch: {
    $route: '$fetch'
  }
}
</script>
