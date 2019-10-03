<template>
  <main class="project">
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
      <markdown :vue="project.vue" />
    </div>
  </main>
</template>

<script>
import Markdown from '~/components/Markdown'

export default {
  components: {
    Markdown
  },
  async asyncData({ params, error }) {
    try {
      const { attributes, vue } = await import(
        `~/contents/projects/${params.project}.md`
      )
      const date = attributes.date.split('/')
      return {
        project: {
          attributes: {
            ...attributes,
            date: new Date(date[1], date[0]).toLocaleString('en-GB', {
              year: 'numeric',
              month: 'long'
            })
          },
          vue
        }
      }
    } catch (e) {
      error({ statusCode: 404, message: 'This project could not be found' })
    }
  }
}
</script>

<style lang="scss">
.project {
  @include page;
  display: grid;
  grid-template-columns: 100%;

  @media (min-width: $breakpoint--lg) {
    grid-template-columns: 1fr 3fr;
  }
}

.project__date {
  color: $color--text-muted;
  font-family: $font--fancy;
  margin-top: -1.25rem;
  margin-bottom: 1.75rem;
  order: 2;
  position: relative;

  @media (min-width: $breakpoint--lg) {
    margin-top: 0;
    order: 1;

    > div {
      bottom: calc(0.25rem + 0.5vw);
      position: absolute;
    }
  }
}

.project__title {
  order: 1;

  @media (min-width: $breakpoint--lg) {
    order: 2;
  }
}

.project__tag-list {
  color: $color--text-muted;
  display: none;
  order: 3;

  &-item::before {
    content: '\2014';
  }

  @media (min-width: $breakpoint--lg) {
    display: block;
  }
}

.project__text {
  order: 4;
}
</style>
