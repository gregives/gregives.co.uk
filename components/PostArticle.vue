<template>
  <article class="article">
    <div class="article__title">
      <h1>{{ post.title }}</h1>
    </div>
    <div class="article__sidebar">
      <p class="article__details">
        <span class="article__date">{{ date }}</span>
        <span class="article__mins">{{ post.mins }} minute read</span>
      </p>
      <ul v-if="post.tags" class="article__tags">
        <li v-for="tag in post.tags" :key="tag">{{ tag }}</li>
      </ul>
      <nuxt-link :to="project ? '/projects' : '/blog'" class="article__back">
        Back to {{ project ? 'projects' : 'blog' }}
      </nuxt-link>
    </div>
    <div class="article__body">
      <p v-if="!project" class="article__description">
        <em>{{ post.description }}</em>
      </p>
      <markdown :vue="post.vue" />
    </div>
  </article>
</template>

<script>
export default {
  props: {
    post: {
      type: Object,
      required: true
    },
    project: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    date() {
      return this.post.date.toLocaleString('en-GB', {
        ...(!this.project && { day: 'numeric' }),
        month: 'long',
        year: 'numeric'
      })
    }
  }
}
</script>

<style lang="scss">
.article {
  display: grid;
  grid-template-columns: 100%;

  @media (min-width: $breakpoint--lg) {
    grid-template-columns: 1fr minmax(0, 3fr);
  }
}

.article__title {
  $clip-path: polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%);
  @include dots($clip-path);

  margin-bottom: 5rem;
  position: relative;

  @media (min-width: $breakpoint--lg) {
    grid-column: 1 / 3;
    padding-left: 25%;
  }

  h1 {
    @include h2;

    background-color: $color__body;
    box-shadow: 0.5rem 0 $color__body, -0.5rem 0 $color__body,
      0.5rem 0.5rem $color__body, -0.5rem 0.5rem $color__body;
    display: inline;
  }

  // Background dots behind post title
  &::before {
    top: -6rem;
    height: calc(100% + 9rem);
  }
}

.article__sidebar {
  padding-right: 3rem;
}

.article__back {
  @include link;

  display: none;

  @media (min-width: $breakpoint--lg) {
    display: inline;
    position: sticky;
    top: 6rem;
  }
}

.article__details {
  color: $color__text--muted;
  margin-bottom: 1.5rem;
}

.article__date {
  &::after {
    content: ' \2014';
  }
}

.article__mins {
  white-space: pre;
}

.article__tags {
  display: none;
  margin-bottom: 1rem;
  padding-left: 1rem;

  @media (min-width: $breakpoint--lg) {
    display: block;
  }

  li {
    color: $color__text--muted;
    position: relative;

    &::before {
      color: $color__text--muted;
      content: '\25B7';
      font-size: 60%;
      height: 100%;
      margin-top: 0.5em;
      margin-right: 0.5rem;
      position: absolute;
      right: 100%;
      top: 0;
      vertical-align: middle;
    }
  }
}

.article__description {
  margin-bottom: 3rem;
}
</style>
