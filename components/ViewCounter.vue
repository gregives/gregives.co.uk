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
    generateUID() {
      return [...crypto.getRandomValues(new Uint8Array(10))]
        .map((b) => b.toString(16).padStart(2, '0'))
        .join('')
    },
    async updateViewCounter() {
      // Generate unique ID to prevent multiple submissions
      if (localStorage.getItem('uid') === null)
        localStorage.setItem('uid', this.generateUID())

      // Get recently viewed pages from local storage
      const url = location.pathname
      const recentViews = JSON.parse(localStorage.getItem('url')) || []

      // Get view count from serverless function
      const response = await fetch('/.netlify/functions/view-counter', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          url,
          uid: localStorage.getItem('uid'),
          recentView: recentViews.includes(url)
        })
      })

      // Add URL to recently viewed pages
      if (!recentViews.includes(url))
        localStorage.setItem('url', JSON.stringify([...recentViews, url]))

      this.views = (await response.json()).views.toLocaleString()
    }
  }
}
</script>
