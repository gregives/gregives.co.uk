<template>
  <div id="__wrapper">
    <top-bar />
    <nuxt />
    <bottom-bar />
    <mouse />
  </div>
</template>

<script>
import TopBar from '~/components/layout/TopBar'
import BottomBar from '~/components/layout/BottomBar'
import Mouse from '~/components/Mouse'

export default {
  components: {
    TopBar,
    BottomBar,
    Mouse
  }
}
</script>

<style lang="scss">
#__wrapper {
  display: flex;
  flex-direction: column;
}

.page-enter-active {
  transition: opacity 250ms $transition__normal--in;

  ~ .footer {
    transition: opacity 250ms $transition__normal--in;
  }
}

.page-leave-active {
  transition: opacity 250ms $transition__normal--out;

  ~ .footer {
    transition: opacity 250ms $transition__normal--out;
  }
}

.page-enter,
.page-leave-active {
  opacity: 0;

  ~ .footer {
    opacity: 0;
  }
}
</style>
