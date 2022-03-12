<template>
  <div class="columns">
    <div class="columns__inner">
      <slot></slot>
    </div>
  </div>
</template>

<style lang="scss">
.columns {
  display: table;
  margin: 0.5rem -1rem;
  table-layout: fixed;
  width: calc(100% + 2rem);

  &__inner {
    display: table-row;

    > * {
      display: table-cell;
      padding: 1rem;

      > iframe,
      > video,
      > .lazy {
        margin: 0 !important;
      }
    }
  }
}
</style>
