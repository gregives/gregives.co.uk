<template>
  <details class="article__specs">
    <summary><h2>Specifications</h2></summary>
    <table>
      <tbody>
        <tr v-for="(value, name) in specs" :key="name">
          <th>{{ name }}</th>
          <td>{{ value }}</td>
        </tr>
      </tbody>
    </table>
  </details>
</template>

<script>
export default {
  props: {
    specs: {
      type: Object,
      required: true
    }
  },
  mounted() {
    if (this.$el.offsetWidth < window.innerWidth / 2) {
      this.$el.open = true
    }
  }
}
</script>

<style lang="scss">
.article__specs {
  h2 {
    @include font__body;

    display: inline-block;
    font-size: 1rem;
    font-weight: 500;
    padding: 0;
    margin: 0;

    &::after {
      display: none;
    }
  }

  table {
    display: table !important;
    margin-top: 1rem !important;
    max-width: none !important;
    width: 100% !important;

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
</style>
