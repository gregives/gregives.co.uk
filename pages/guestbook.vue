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
  @include background(
    ((calc(50% + 5rem) 30rem 20rem), (calc(50% + 30rem) -30rem 50rem))
  );
}

.guestbook__title {
  @include title;

  margin-bottom: 4rem;
}

.guestbook__title--primary {
  @include title--primary;
}
</style>
