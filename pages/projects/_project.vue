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
  grid-template-columns: 100%;
  margin: 3.5rem 0;

  @media (min-width: $break-lg) {
    grid-template-columns: 1fr 3fr;
  }
}

.project__date {
  color: transparentize(black, 0.46);
  font-family: $font-monospace;
  margin-top: -1.25rem;
  margin-bottom: 1.75rem;
  order: 2;
  position: relative;

  @media (min-width: $break-lg) {
    margin-top: 0;
    order: 1;

    > div {
      bottom: calc(0.25rem + 0.75vw);
      position: absolute;
    }
  }
}

.project__title {
  order: 1;

  @media (min-width: $break-lg) {
    order: 2;
  }
}

.project__tag-list {
  color: transparentize(black, 0.46);
  display: none;
  order: 3;

  &-item::before {
    content: '\2014';
  }

  @media (min-width: $break-lg) {
    display: block;
  }
}

.project__text {
  order: 4;
}
</style>
