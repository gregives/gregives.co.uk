<template>
  <span v-if="views">{{ views }} views</span>
</template>

<script>
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
    async updateViewCounter() {
      const url = location.pathname
      const recentViews = JSON.parse(localStorage.getItem('views')) || {}
      const recentlyViewed = recentViews.hasOwnProperty(url)
      const cacheIsStale = recentlyViewed && recentViews[url].cache < Date.now() - 3600000

      // Get number of views from serverless function
      if (!recentlyViewed || cacheIsStale) {
        const { views } = await fetch('/.netlify/functions/view-counter', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            url,
            recentlyViewed
          })
        }).then((response) => response.json())
        
        recentViews[url] = {
          cache: Date.now(),
          views
        }
      }

      // Set number of views and update recent views
      this.views = recentViews[url].views.toLocaleString()
      localStorage.setItem('views', JSON.stringify(recentViews))
    }
  }
}
</script>
