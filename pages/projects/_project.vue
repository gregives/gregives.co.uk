<template>
  <div class="container">
    <h2>{{ project.attributes.title }}</h2>
  </div>
</template>

<script>
export default {
  asyncData({ params, error }) {
    try {
      const project = require(`~/contents/projects/${params.project}.md`)
      return {
        project
      }
    } catch (e) {
      error({ statusCode: 404, message: 'This project could not be found' })
    }
  }
}
</script>
