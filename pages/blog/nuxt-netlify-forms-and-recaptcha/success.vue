<template>
  <main class="success">
    <h1 class="success__title">
      <span class="success__title--primary">Success</span> Page
    </h1>
    <p class="success__message">
      You've reached the success page, click the button below to go back to the
      blog post!
    </p>
    <nuxt-link to="../" class="success__back"> Take me back </nuxt-link>
  </main>
</template>

<style lang="scss">
.success {
  $clip-path: polygon(0% 90%, 100% 50%, 100% 90%, 70% 100%, 0% 100%);
  @include page;
  @include dots($clip-path);
}

.success__title {
  @include title;
}

.success__title--primary {
  @include title--primary;
}

.success__message {
  margin-bottom: 3rem;
  width: 100%;

  @media (min-width: $breakpoint--md) {
    width: 50%;
  }
}

.success__back {
  @include button;
  @include button--primary;
}
</style>
