<template>
  <main class="project">
    <post-article :post="project" :project="true" />
  </main>
</template>

<script>
import PostArticle from '~/components/PostArticle'

export default {
  components: {
    PostArticle
  },
  computed: {
    project() {
      return this.$store.state.projects.project
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
      await store.dispatch('projects/GET_PROJECT', params.project)
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
    grid-template-columns: 25% 75%;
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
  color: $color__text--muted;
  display: none;
  margin-bottom: 1rem;
  transition: color 150ms ease-out;

  &:hover {
    color: $color__primary;
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
  font-family: $font__fancy;
  font-size: 120%;
  margin-bottom: 1rem;
}

.project__tag-list {
  color: $color__text--muted;
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
