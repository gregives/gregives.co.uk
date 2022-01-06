<script>
import { hydrateNever, hydrateWhenVisible } from 'vue-lazy-hydration'

export default {
  components: {
    Columns: hydrateNever(() => import('~/components/Columns')),
    PostAside: hydrateNever(() => import('~/components/PostAside')),
    VideoCompat: hydrateNever(() => import('~/components/VideoCompat')),
    // Components for individual blog posts
    Interpolation: hydrateWhenVisible(() =>
      import('~/components/interactive/Interpolation')
    ),
    NetlifyForm: hydrateWhenVisible(() =>
      import('~/components/interactive/NetlifyForm')
    )
  },
  props: {
    markdown: {
      type: Object,
      required: true
    }
  },
  created() {
    // eslint-disable-next-line no-new-func
    this.templateRender = new Function(this.markdown.vue.render)()
    // eslint-disable-next-line no-new-func
    this.$options.staticRenderFns = new Function(
      this.markdown.vue.staticRenderFns
    )()
  },
  render(createElement) {
    return this.templateRender()
  }
}
</script>

<style lang="scss">
.markdown {
  h1,
  h2 {
    padding-bottom: 0.25rem;
    position: relative;

    &::after {
      background: linear-gradient(to right, $color__text--muted, transparent);
      bottom: 0;
      content: '';
      height: $border-weight;
      left: 0;
      position: absolute;
      width: 100%;
    }
  }

  h1,
  h2,
  h3,
  h4 {
    .header-anchor {
      &::after {
        color: $color__text--muted;
        content: '\00A0#';
        opacity: 0;
        transition: opacity 150ms $transition__normal;
      }

      &:hover,
      &:focus {
        &::after {
          opacity: 1;
        }
      }
    }
  }

  h1:not(:first-child) {
    @include h2;

    margin-top: 2rem;
  }

  h2:not(:first-child) {
    @include h3;

    margin-top: 1.75rem;
  }

  h3:not(:first-child) {
    @include h4;

    margin-top: 1.5rem;
  }

  h4:not(:first-child) {
    @include h5;

    margin-top: 1.25rem;
  }

  h5:not(:first-child) {
    @include h6;

    margin-top: 1rem;
  }

  a:not(.header-anchor) {
    @include link;
  }

  iframe,
  video {
    border-radius: $border-radius;
    box-shadow: $box-shadow;
    display: block;
    width: 100%;
  }

  p:not(:first-child) {
    > iframe,
    > video,
    > .lazy {
      margin-top: 2rem;
    }
  }

  p:not(:last-child) {
    margin-bottom: 1rem;

    > iframe,
    > video,
    > .lazy {
      margin-bottom: 2rem;
    }
  }

  p + ul {
    margin-top: -0.5rem;
  }

  ul,
  ol {
    margin-left: 2rem;

    &:not(:last-child) {
      margin-bottom: 1rem;
    }

    li {
      .highlight {
        margin: 0.5rem 0 !important;
      }

      + li {
        margin-top: 0.25rem;
      }
    }

    ul,
    ol {
      margin-left: 1.5rem;
      margin-bottom: 0.5rem !important;
    }
  }

  ul {
    list-style-type: disc;

    ul {
      list-style-type: circle;

      ul {
        list-style-type: square;
      }
    }
  }

  ul.contains-task-list {
    list-style-type: none;
    margin-left: 0;

    ul.contains-task-list {
      margin-left: 1.5rem;
    }
  }

  ol {
    list-style-type: decimal;

    ol {
      list-style-type: lower-latin;

      ol {
        list-style-type: lower-roman;
      }
    }
  }

  mark {
    background-color: $color__primary--muter;
    border-radius: $border-radius;
    color: $color__primary;
    padding: 0 0.25rem;
    margin: 0;
  }

  blockquote {
    background-color: $color__body--overlay;
    border-radius: $border-radius;
    padding: 1rem (1rem + $border-radius);
    position: relative;

    &:not(:first-child) {
      margin-top: 1.5rem;
    }

    &:not(:last-child) {
      margin-bottom: 1.5rem;
    }

    &::before {
      background-color: $color__primary--muted;
      border-bottom-left-radius: $border-radius;
      border-top-left-radius: $border-radius;
      content: '';
      height: 100%;
      left: 0;
      position: absolute;
      top: 0;
      width: $border-radius;
    }

    a:not(.header-anchor) {
      @include link($color__body--overlay);
    }
  }

  table {
    border: $border-weight solid $color__text--muted;
    border-collapse: separate;
    border-radius: $border-radius;
    display: block;
    max-width: fit-content;
    overflow-x: auto;
    text-align: left;
    width: 100%;

    &::-webkit-scrollbar-track {
      background-color: transparent;
    }

    &:not(:first-child) {
      margin-top: 2rem;
    }

    &:not(:last-child) {
      margin-bottom: 2rem;
    }

    th {
      font-weight: 500;
    }

    th,
    td {
      border-left: $border-weight solid $color__text--muted;
      border-top: $border-weight solid $color__text--muted;
      padding: 0.5rem 0.75rem;
    }

    th:first-child,
    td:first-child {
      border-left: none;
    }

    thead:first-child,
    tbody:first-child {
      tr:first-child {
        th,
        td {
          border-top: none;
        }
      }
    }
  }

  .highlight {
    &:not(:first-child) {
      margin-top: 1.5rem;
    }

    &:not(:last-child) {
      margin-bottom: 1.5rem;
    }
  }

  p:empty,
  .table-of-contents {
    display: none;
  }
}
</style>
