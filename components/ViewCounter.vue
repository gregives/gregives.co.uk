<template>
  <span v-if="views">{{ views }} views</span>
</template>

<script>
// Netlify Functions endpoint
const ENDPOINT = '/.netlify/functions/dynamic-page'

export default {
  data() {
    return {
      views: null
    }
  },
  watch: {
    $route() {
      this.updateViewCounter()
    }
  },
  mounted() {
    this.updateViewCounter()
  },
  methods: {
    async updateViewCounter(force = false) {
      const url = this.$route.path

      // Get cached data from local storage
      const cache = JSON.parse(localStorage.getItem('pages')) || {}
      const visitedPageBefore = cache.hasOwnProperty(url)

      // Update data at most once every hour
      const cacheIsStale =
        visitedPageBefore &&
        cache[url].lastVisited < Date.now() - 60 * 60 * 1000

      // Get number of views from serverless function
      if (!visitedPageBefore || cacheIsStale || force) {
        const { views, comments } = await fetch(ENDPOINT, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            url,
            visitedPageBefore
          })
        }).then((response) => response.json())

        cache[url] = {
          lastVisited: Date.now(),
          views,
          comments
        }
      }

      // Set number of views and update recent views
      this.views = cache[url].views.toLocaleString()
      localStorage.setItem('pages', JSON.stringify(cache))
    }
  }
}
</script>
