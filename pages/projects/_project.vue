<template>
  <div class="container">
    <article class="project">
      <div class="project__date">
        <div>{{ project.attributes.date }}</div>
      </div>
      <h2 class="project__title">{{ project.attributes.title }}</h2>
      <ul class="project__tag-list">
        <li
          v-for="tag in project.attributes.tags"
          :key="tag"
          class="project__tag-list-item"
        >
          {{ tag }}
        </li>
      </ul>
      <div class="project__text">
        <markdown :html="project.html" />
      </div>
    </article>
  </div>
</template>

<script>
import Markdown from '~/components/Markdown'

export default {
  components: {
    Markdown
  },
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

<style lang="scss">
@import '~/assets/sass/_variables';

.project {
  display: grid;
  grid-template-columns: 1fr 3fr;
  margin: 3.5rem 0;
}

.project__date {
  color: transparentize(black, 0.46);
  font-family: $font-monospace;
  position: relative;

  > div {
    bottom: calc(2rem + 0.75vw);
    position: absolute;
  }
}

.project__tag-list {
  color: transparentize(black, 0.46);

  &-item::before {
    content: '\2014';
  }
}
</style>
