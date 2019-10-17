<template>
  <main class="project">
    <div class="project__content">
      <div>
        <div class="project__back project__back--mobile">
          <nuxt-link to="/projects">
            Back to projects&nbsp;&nbsp;&#x2190;
          </nuxt-link>
        </div>
      </div>
      <h2 class="project__title">{{ project.attributes.title }}</h2>
      <div class="project__details">
        <div class="project__sticky">
          <div class="project__back">
            <nuxt-link to="/projects">
              Back to projects&nbsp;&nbsp;&#x2190;
            </nuxt-link>
          </div>
          <div class="project__date">
            <div>{{ project.attributes.date }}</div>
          </div>
          <ul class="project__tag-list">
            <li
              v-for="tag in project.attributes.tags"
              :key="tag"
              class="project__tag-list-item"
            >
              {{ tag }}
            </li>
          </ul>
        </div>
      </div>
      <div class="project__text">
        <markdown :vue="project.vue" />
      </div>
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
  },
  head() {
    return {
      title: this.project.attributes.title,
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: this.project.attributes.description
        }
      ]
    }
  }
}
</script>

<style lang="scss">
.project {
  @include page;
}

.project__content {
  display: grid;
  grid-template-columns: 100%;

  @media (min-width: $breakpoint--lg) {
    grid-template-columns: 1fr 3fr;
  }
}

.project__details {
  margin-bottom: 1rem;
  margin-top: -1rem;

  @media (min-width: $breakpoint--lg) {
    margin-top: -3.75rem;
  }
}

.project__sticky {
  @media (min-width: $breakpoint--lg) {
    position: sticky;
    top: 6rem;
  }
}

.project__back {
  color: $color--text-muted;
  display: none;
  margin-bottom: 1rem;
  transition: color 150ms ease-out;

  &:hover {
    color: $color--primary;
  }

  &--mobile {
    display: block;
  }

  @media (min-width: $breakpoint--lg) {
    display: block;
    margin-bottom: 2rem;

    &--mobile {
      display: none;
    }
  }
}

.project__date {
  font-family: $font--fancy;
  font-size: 120%;
  margin-bottom: 1rem;
}

.project__tag-list {
  color: $color--text-muted;
  display: none;
  margin-left: 1rem;

  &-item::before {
    content: '\2014';
  }

  @media (min-width: $breakpoint--lg) {
    display: block;
  }
}
</style>
