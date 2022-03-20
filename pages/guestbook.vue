<template>
  <main class="guestbook">
    <h1 class="guestbook__title">
      Sign My <span class="guestbook__title--primary">Guestbook</span>
    </h1>
    <comments :guestbook="true" />
  </main>
</template>

<script>
import Comments from '~/components/Comments'

export default {
  components: {
    Comments
  },
  head() {
    return {
      title: 'Guestbook'
    }
  }
}
</script>

<style lang="scss">
.guestbook {
  @include page;
}

.guestbook__title {
  @include title;
}

.guestbook__title--primary {
  @include title--primary;
}
</style>
