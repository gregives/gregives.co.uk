<template>
  <main class="post">
    <post-article :post="post" :project="false" />
  </main>
</template>

<script>
import PostArticle from '~/components/PostArticle'

export default {
  components: {
    PostArticle
  },
  computed: {
    post() {
      return this.$store.state.posts.post
    },
    date() {
      return this.post.date.toLocaleString('en-GB', {
        year: 'numeric',
        month: 'long',
        day: '2-digit'
      })
    }
  },
  async fetch({ store, params, error }) {
    try {
      await store.dispatch('posts/GET_POST', params.post)
    } catch {
      error({ statusCode: 404, message: 'This post could not be found' })
    }
  },
  head() {
    return {
      title: this.post.title,
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: this.post.description
        }
      ]
    }
  }
}
</script>

<style lang="scss">
.post {
  $clip-path: polygon(60% 0%, 100% 0%, 100% 100%, 30% 40%);
  @include page;
  @include dots($clip-path);

  &::before {
    height: 15rem;
  }
}

.post__content {
  display: grid;
  grid-template-columns: 100%;

  @media (min-width: $breakpoint--lg) {
    grid-template-columns: 1fr 3fr;
  }
}

.post__title {
  @include h2;
}

.post__details {
  margin-bottom: 1rem;
  margin-top: -1rem;

  @media (min-width: $breakpoint--lg) {
    margin-top: -3.75rem;
  }
}

.post__sticky {
  @media (min-width: $breakpoint--lg) {
    position: sticky;
    top: 6rem;
  }
}

.post__back {
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

.post__date {
  font-family: $font__fancy;
  font-size: 120%;
  margin-bottom: 1rem;
}

.post__tag-list {
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
