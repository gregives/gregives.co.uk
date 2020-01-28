<template>
  <main class="blog">
    <h1 class="blog__title">
      My <span class="blog__title--primary">Blog</span> Posts
    </h1>
    <ol class="blog__list">
      <li v-for="post in posts" :key="post.title" class="blog__post">
        <h3>
          <nuxt-link :to="post.link" class="blog__post-link">
            {{ post.title }}
          </nuxt-link>
        </h3>
        <p class="blog__post-details">
          {{
            post.date.toLocaleString('en-GB', {
              year: 'numeric',
              month: 'long',
              day: '2-digit'
            })
          }}
          &mdash; {{ post.mins }} minute read
        </p>
        <p class="blog__post-description">{{ post.description }}</p>
      </li>
    </ol>
  </main>
</template>

<script>
export default {
  computed: {
    posts() {
      return this.$store.state.posts.posts
    }
  },
  head() {
    return {
      title: 'Blog'
    }
  },
  async fetch({ store }) {
    await store.dispatch('posts/GET_POSTS')
  }
}
</script>

<style lang="scss">
.blog {
  @include page;
}

.blog__title {
  @include title;
}

.blog__title--primary {
  @include title--primary;
}

.blog__list {
  display: grid;
  grid-gap: 1.5rem;
}

.blog__post {
  background: linear-gradient(to right, $color__body, transparent),
    linear-gradient(transparent 75%, #{transparentize(black, 0.95)}),
    $color__body--overlay;
  border-radius: $border-radius;
  padding: 1.5rem;
  padding-top: 1rem;
  padding-left: 0;
  position: relative;

  &::before {
    box-shadow: $box-shadow--small;
    border: $border-weight solid $color__primary--muted;
    border-radius: $border-radius;
    content: '';
    height: calc(100% + #{2 * $border-weight});
    left: 0;
    position: absolute;
    top: -$border-weight;
    transition: box-shadow 150ms ease-out, border-color 150ms ease-out;
    width: calc(100% + #{$border-weight});
    z-index: -1;
  }

  &::after {
    background: linear-gradient(to right, $color__body 2rem, transparent);
    content: '';
    height: calc(100% + 2rem);
    left: -2rem;
    position: absolute;
    top: -1rem;
    width: calc(100% + 2rem);
    z-index: -1;
  }

  > h3 {
    margin-bottom: 0.5rem;
  }

  &:hover::before {
    border-color: $color__primary;
    box-shadow: $box-shadow;
  }
}

.blog__post-link {
  @include link;

  &::after {
    position: absolute;
    width: 100%;
    height: 100%;
    left: 0;
    content: '';
    top: 0;
  }
}

.blog__post-details {
  color: $color__text--muted;
  margin-bottom: 0.5rem;
}
</style>
