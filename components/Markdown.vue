<script>
export default {
  props: {
    vue: {
      type: Object,
      default() {
        return {}
      }
    }
  },
  created() {
    // eslint-disable-next-line
    this.templateRender = new Function(this.vue.render)()
    // eslint-disable-next-line
    this.$options.staticRenderFns = new Function(this.vue.staticRenderFns)()
  },
  render(createElement) {
    return this.templateRender ? this.templateRender() : createElement('div')
  }
}
</script>

<style lang="scss">
@import '~/assets/sass/_variables';

.markdown {
  h3,
  h4,
  h5,
  h6 {
    border-bottom: 1px solid transparentize(black, 0.5);
    padding-bottom: 0.25rem;
    position: relative;

    .header-anchor {
      color: $color--text-muted;
      font-weight: 400;
      margin-left: 0.5rem;
      opacity: 0.2;
      transition: opacity 150ms ease;

      &:focus {
        opacity: 1;
      }
    }

    &:hover .header-anchor {
      opacity: 1;
    }
  }

  h3:not(:first-child) {
    margin-top: 1.75rem;
  }

  h4:not(:first-child) {
    margin-top: 1.5rem;
  }

  h5:not(:first-child) {
    margin-top: 1.25rem;
  }

  h6:not(:first-child) {
    margin-top: 1rem;
  }

  p {
    margin-bottom: 1rem;
  }

  img {
    margin-bottom: 1rem;
    max-height: 2/3 * 100vh;
    object-fit: contain;
    object-position: top left;
    width: 100%;
  }

  ul,
  ol {
    margin-left: 1rem;
    margin-bottom: 1rem;

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
    background-color: transparentize($color--primary, 0.8);
  }

  blockquote {
    border-left: 4px solid transparentize($color--primary, 0.6);
    padding-left: 1rem;
  }

  table {
    border: 1px solid transparentize(black, 0.6);
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
      border-left: 1px solid transparentize(black, 0.6);
      padding: 0.5rem 0.75rem;
    }

    td {
      border-top: 1px solid transparentize(black, 0.6);
    }

    th:first-child,
    td:first-child {
      border-left: none;
    }
  }
}
</style>
