<template>
  <article class="article">
    <div class="article__title">
      <h1>{{ post.title }}</h1>
    </div>
    <div class="article__sidebar">
      <p v-if="type !== 'hidden'" class="article__details">
        <small class="article__date">{{ date }}</small>
        <small v-if="type === 'post'" class="article__mins">
          {{ post.mins }} minute read
        </small>
      </p>
      <ul v-if="post.tags" class="article__tags">
        <li v-for="tag in post.tags" :key="tag">{{ tag }}</li>
      </ul>
      <div v-if="post.specs" class="article__watch">
        <table>
          <thead>
            <tr>
              <th colspan="2">Specifications</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(value, name) in post.specs" :key="name">
              <th>{{ name }}</th>
              <td>{{ value }}</td>
            </tr>
          </tbody>
        </table>
        <a v-if="post.purchase" class="article__purchase" :href="post.purchase">
          <span>Buy now</span>
        </a>
        <p class="article__affiliate-notice">
          *&#8239;Links with an asterisk are affiliate links, which means I get
          a commission if you decide to buy anything. This won't cost you a
          penny more but will help keep this blog going!
        </p>
      </div>
      <div v-if="type !== 'watch'" ref="contents" class="article__contents">
        <strong>Table of Contents</strong>
      </div>
    </div>
    <div class="article__body">
      <p
        v-if="type === 'post' && post.description"
        class="article__description"
      >
        {{ post.description }}
      </p>
      <markdown :markdown="post" />
      <div v-if="type !== 'hidden'" class="article__footer">
        <back-icon />
        <nuxt-link v-if="type === 'post'" to="/blog/" class="article__back">
          See all blog posts
        </nuxt-link>
        <nuxt-link
          v-if="type === 'project'"
          to="/projects/"
          class="article__back"
        >
          See all projects
        </nuxt-link>
        <nuxt-link v-if="type === 'watch'" to="/watches/" class="article__back">
          See all watches
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
    type: {
      type: String,
      required: true
    }
  },
  computed: {
    date() {
      return this.post.date.toLocaleString('en-GB', {
        ...(this.type === 'post' && { day: 'numeric' }),
        month: 'short',
        year: 'numeric'
      })
    }
  },
  mounted() {
    const tableOfContents = this.$el.querySelector('.table-of-contents')

    // Move table of contents to side bar
    if (tableOfContents !== null) {
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

  @media print {
    margin-bottom: 2rem;

    &::before {
      display: none;
    }
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
  @media (min-width: $breakpoint--lg) {
    padding-right: 3rem;
  }
}

.article__contents {
  display: none;
  max-height: calc(100vh - 7rem);
  opacity: 0.4;
  overflow-y: auto;
  margin: 0 -1rem;
  padding: 0 1rem 1rem;
  position: sticky;
  top: 6rem;
  transition: opacity 150ms $transition__normal;

  &:hover,
  &:focus-within {
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

    ol ol {
      margin-left: 1rem;
      font-size: 90%;
    }

    li {
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

  .material-design-icon svg {
    color: $color__primary;
  }
}

.article__back {
  @include link;

  &::after {
    content: '';
    inset: 0;
    position: absolute;
  }
}

.article__details {
  color: $color__text--muted;
  margin-bottom: 2rem;
}

.article__mins {
  white-space: nowrap;

  &::before {
    content: '\2022';
  }
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
      position: absolute;
      inset: 0.25rem calc(100% + 0.5rem) 0 auto;
      vertical-align: middle;
    }
  }
}

.article__watch {
  @media (min-width: $breakpoint--lg) {
    max-height: calc(100vh - 7rem);
    overflow-y: auto;
    padding-bottom: 1rem;
    position: sticky;
    top: 6rem;

    &::-webkit-scrollbar-track {
      background-color: $color__body;
    }
  }

  table {
    display: table;
    max-width: none;
    width: 100%;

    th {
      white-space: nowrap;
    }

    tbody {
      font-size: 80%;

      tr:last-child {
        td {
          font-size: 120%;
          line-height: 0;
        }
      }
    }
  }
}

.article__purchase {
  @include button;
  @include button--primary;

  display: block;
  font-variant: small-caps;
  margin: 1.5rem 0 1rem;

  > span::after {
    content: '\202F*';
    opacity: 0.6;
  }
}

.article__affiliate-notice {
  color: $color__text--muted;
  font-size: 70%;
  margin-bottom: 3rem;

  @media (min-width: $breakpoint--lg) {
    margin-bottom: 0;
  }
}

.article__description {
  @include h5;

  color: $color__primary;
  font-weight: 300;
  margin-bottom: 3rem;
}
</style>
