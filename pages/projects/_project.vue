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
      <h1 class="project__title">{{ project.title }}</h1>
      <div class="project__details">
        <div class="project__sticky">
          <div class="project__back">
            <nuxt-link to="/projects">
              Back to projects&nbsp;&nbsp;&#x2190;
            </nuxt-link>
          </div>
          <div class="project__date">
            <div>{{ date }}</div>
          </div>
          <ul class="project__tag-list">
            <li
              v-for="tag in project.tags"
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
export default {
  computed: {
    project() {
      return this.$store.state.projects.currentProject
    },
    date() {
      return this.project.date.toLocaleString('en-GB', {
        year: 'numeric',
        month: 'long'
      })
    }
  },
  async fetch({ store, params, error }) {
    try {
      await store.dispatch('projects/setCurrentProject', params.project)
    } catch {
      error({ statusCode: 404, message: 'This project could not be found' })
    }
  },
  head() {
    return {
      title: this.project.title,
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: this.project.description
        }
      ]
    }
  }
}
</script>

<style lang="scss">
.project {
  $clip-path: polygon(60% 0%, 100% 0%, 100% 100%, 30% 40%);
  @include page;
  @include dots($clip-path);

  &::before {
    height: 15rem;
  }
}

.project__content {
  display: grid;
  grid-template-columns: 100%;

  @media (min-width: $breakpoint--lg) {
    grid-template-columns: 1fr 3fr;
  }
}

.project__title {
  @include h2;
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
