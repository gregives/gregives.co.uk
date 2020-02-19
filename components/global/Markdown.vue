<script>
export default {
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
      color: $color__text--muted;
      margin-left: 0.5rem;
      opacity: 0;
      transition: opacity 150ms $transition__normal;

      &:focus {
        opacity: 1;
      }
    }

    &:hover .header-anchor {
      opacity: 1;
    }
  }

  h1:not(:first-child) {
    @include h2;

    margin-top: 1.75rem;
  }

  h2:not(:first-child) {
    @include h3;

    margin-top: 1.5rem;
  }

  h3:not(:first-child) {
    @include h4;

    margin-top: 1.25rem;
  }

  h4:not(:first-child) {
    @include h5;

    margin-top: 1rem;
  }

  h5:not(:first-child) {
    @include h6;

    margin-top: 0.75rem;
  }

  p:not(:last-child) {
    margin-bottom: 1rem;
  }

  a:not(.header-anchor) {
    @include link;
  }

  .lazy {
    margin-top: 2rem;

    &:not(:last-child) {
      margin-bottom: 2rem;
    }
  }

  iframe,
  video {
    border-radius: $border-radius;
    box-shadow: $box-shadow;
    display: block;
    margin-top: 2rem;
    width: 100%;

    &:not(:last-child) {
      margin-bottom: 2rem;
    }
  }

  ul,
  ol {
    margin-left: 2rem;

    &:not(:last-child) {
      margin-bottom: 1rem;
    }

    ul,
    ol {
      margin-left: 1.5rem;
      margin-bottom: 0;
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
    background-color: $color__primary--muted;
    color: $color__text;
  }

  blockquote {
    border-left: 4px solid $color__primary--muted;
    padding-left: 1rem;

    &:not(:last-child) {
      margin-bottom: 1rem;
    }
  }

  table {
    border: 1px solid $color__text--muted;
    border-collapse: separate;
    border-radius: $border-radius;
    max-width: 100%;
    overflow: auto;
    text-align: left;

    th {
      font-weight: 500;
    }

    th,
    td {
      border-left: 1px solid $color__text--muted;
      padding: 0.5rem 0.75rem;
    }

    td {
      border-top: 1px solid $color__text--muted;
    }

    th:first-child,
    td:first-child {
      border-left: none;
    }
  }
}
</style>
