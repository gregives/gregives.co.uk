<template>
  <aside :class="typeModifier" class="aside">
    <div class="aside__corner"></div>
    <slot></slot>
  </aside>
</template>

<script>
export default {
  props: {
    type: {
      type: String,
      default: 'info'
    }
  },
  computed: {
    typeModifier() {
      return `aside--${this.type}`
    }
  }
}
</script>

<style lang="scss">
.aside {
  background-color: $color__body--overlay;
  border-radius: $border-radius;
  box-shadow: $box-shadow;
  margin-top: 2.25rem;
  padding: 1.25rem (1rem + $border-radius) 1rem;
  position: relative;

  &:not(:last-child) {
    margin-bottom: 2rem;
  }

  &::before {
    background-color: $color__primary;
    border-bottom-left-radius: $border-radius;
    border-top-left-radius: $border-radius;
    content: '';
    height: 100%;
    left: 0;
    position: absolute;
    top: 0;
    width: $border-radius;
  }

  &::after {
    @include font__fancy;

    background-color: $color__body--overlay;
    border: $border-weight solid $color__primary;
    border-radius: 50%;
    box-shadow: $box-shadow--small;
    color: $color__primary;
    content: 'i';
    font-size: 150%;
    height: 2rem;
    left: 0.5rem;
    line-height: 2rem;
    position: absolute;
    text-align: center;
    top: -0.25rem;
    transform: translate(-50%, -50%);
    width: 2rem;
    z-index: 1;
  }

  &__corner {
    height: 2rem;
    left: 0;
    overflow: hidden;
    position: absolute;
    top: 0;
    width: 2rem;

    &::after {
      background-color: $color__body;
      border-radius: 50%;
      box-shadow: $box-shadow--small inset;
      content: '';
      height: 2.5rem;
      left: 0.5rem;
      position: absolute;
      top: -0.25rem;
      transform: translate(-50%, -50%);
      width: 2.5rem;
    }
  }

  a {
    @include link($color__body--overlay);
  }

  &--warning {
    &::before {
      background-color: $color__warning;
    }

    &::after {
      border: $border-weight solid $color__warning;
      color: $color__warning;
      content: '!';
    }
  }
}
</style>
