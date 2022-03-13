<template>
  <main class="guestbook">
    <h1 class="guestbook__title">
      Sign My <span class="guestbook__title--primary">Guestbook</span>
    </h1>
    <comments :guestbook="true" />
  </main>
</template>

<script>
import { hydrateWhenIdle } from 'vue-lazy-hydration'

export default {
  components: {
    Comments: hydrateWhenIdle(() => import('~/components/Comments'))
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

.guestbook__description {
  margin-bottom: 3rem;
}
</style>
