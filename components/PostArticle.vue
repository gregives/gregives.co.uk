<template>
  <article class="article">
    <div></div>
    <h1 class="article__title">{{ post.title }}</h1>
    <div class="article__details">
      <div class="article__sticky">
        <nuxt-link :to="project ? '/projects' : '/blog'" class="article__back">
          Back to {{ project ? 'projects' : 'blog' }}
        </nuxt-link>
      </div>
    </div>
    <div class="article__body">
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
        ...(!this.project && { day: '2-digit' }),
        year: 'numeric',
        month: 'long'
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
    grid-template-columns: 25% 75%;
  }
}

.article__title {
  @include h2;
}

.article__sticky {
  @media (min-width: $breakpoint--lg) {
    position: sticky;
    top: 6rem;
  }
}

.article__back {
  @include link;
}
</style>
