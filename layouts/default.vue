<template>
  <div id="__app">
    <navbar />
    <nuxt />
  </div>
</template>

<script>
import Navbar from '~/components/Navbar'

export default {
  components: {
    Navbar
  }
}
</script>

<style lang="scss">
#__layout > div {
  height: 100%;
  display: flex;
  flex-direction: column;

  > main {
    flex: 1;
  }
}
</style>
