<template>
  <div class="markdown" v-html="html"></div>
</template>

<script>
export default {
  props: {
    html: {
      type: String,
      default: ''
    }
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
      font-weight: 400;
      opacity: 0.1;
    }

    &:hover .header-anchor {
      opacity: 0.46;
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
    background-color: transparentize($color-primary, 0.6);
  }

  blockquote {
    border-left: 4px solid transparentize($color-primary, 0.6);
    padding-left: 1rem;
  }

  table {
    display: block;
    overflow: auto;
    text-align: left;
    width: 100%;

    th {
      font-weight: 500;
    }

    th,
    td {
      border: 1px solid transparentize(black, 0.6);
      padding: 0.5rem 0.75rem;
    }
  }
}
</style>
