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
  table-layout: fixed;
  width: 100%;

  &__inner {
    display: table-row;

    > * {
      display: table-cell;
    }
  }
}
</style>
