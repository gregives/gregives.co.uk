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
      <div ref="contents" class="article__contents">
        <strong>Table of Contents</strong>
      </div>
    </div>
    <div class="article__body">
      <p v-if="!project" class="article__description">
        {{ post.description }}
      </p>
      <markdown :markdown="post" />
      <div class="article__footer">
        <back-icon />
        <nuxt-link v-if="project" to="/projects/" class="article__back">
          See all projects
        </nuxt-link>
        <nuxt-link v-else to="/blog/" class="article__back">
          See all blog posts
        </nuxt-link>
      </div>
    </div>
  </article>
</template>

<script>
import BackIcon from 'icons/KeyboardBackspace'

export default {
  components: {
    BackIcon
  },
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
  },
  mounted() {
    const tableOfContents = this.$el.querySelector('.table-of-contents')

    // Move table of contents to side bar
    if (
      tableOfContents !== null &&
      tableOfContents.firstChild.children.length
    ) {
      this.$refs.contents.appendChild(tableOfContents)
      this.$refs.contents.style.display = 'block'
    }
  }
}
</script>

<style lang="scss">
.article {
  display: grid;
  grid-template-columns: 100%;

  @media (min-width: $breakpoint--lg) {
    grid-template-columns: minmax(0, 2fr) minmax(0, 5fr);
  }
}

.article__title {
  $clip-path: polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%);
  @include dots($clip-path);

  margin-bottom: 5rem;
  position: relative;

  @media (min-width: $breakpoint--lg) {
    grid-column: 1 / 3;
    padding-left: math.div(200%, 7);
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

.article__contents {
  display: none;
  max-height: calc(100vh - 6rem);
  opacity: 0.4;
  overflow-y: auto;
  margin-right: -1rem;
  padding-right: 1rem;
  padding-bottom: 2rem;
  position: sticky;
  top: 6rem;
  transition: opacity 150ms $transition__normal;

  &:hover {
    opacity: 1;
  }

  &::-webkit-scrollbar-track {
    background-color: $color__body;
  }

  @media (max-width: $breakpoint--lg) {
    display: none !important;
  }

  .table-of-contents {
    font-size: 80%;
    margin-top: 1rem;

    li {
      filter: saturate(0);
      margin-top: 0.5rem;

      a {
        @include link;

        color: inherit;
      }
    }
  }
}

.article__body {
  .markdown {
    margin-bottom: 1.5rem;
  }

  .table-of-contents {
    display: none;
  }
}

.article__footer {
  display: inline-block;
  position: relative;

  .material-design-icon {
    color: $color__primary;
    vertical-align: top;
  }
}

.article__back {
  @include link;

  &::after {
    content: '';
    height: 100%;
    left: 0;
    position: absolute;
    top: 0;
    width: 100%;
  }
}

.article__details {
  color: $color__text--muted;
  margin-bottom: 2rem;
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
  @include h5;

  color: $color__primary;
  font-weight: 300;
  margin-bottom: 3rem;
}
</style>
