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
      const recentViews = JSON.parse(localStorage.getItem('recent')) || {}
      const cachedViews = JSON.parse(sessionStorage.getItem('cache')) || {}
      const needToCallFunction =
        !recentViews.hasOwnProperty(url) || !cachedViews.hasOwnProperty(url)

      // Get number of views from serverless function
      if (needToCallFunction)
        cachedViews[url] = await fetch('/.netlify/functions/view-counter', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            url,
            recentlyViewed: recentViews.hasOwnProperty(url)
          })
        })
          .then((response) => response.json())
          .then((data) => data.views)

      // Set recent view to current time and display view count
      recentViews[url] = Date.now()
      this.views = cachedViews[url].toLocaleString()

      // Update recent views and cache
      localStorage.setItem('recent', JSON.stringify(recentViews))
      sessionStorage.setItem('cache', JSON.stringify(cachedViews))
    }
  }
}
</script>
