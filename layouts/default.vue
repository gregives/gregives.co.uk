<template>
  <div>
    <navbar />
    <main>
      <nuxt />
    </main>
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

<style lang="scss" scoped>
div {
  height: 100%;
  display: flex;
  flex-direction: column;

  main {
    flex: 1;
  }
}
</style>
