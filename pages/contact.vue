<template>
  <main class="contact">
    <h1 class="contact__title">
      <span class="contact__title--primary">Contact</span> Me
    </h1>
  </main>
</template>

<style lang="scss">
.contact {
  @include container;
  padding: 3rem 0;
}

.contact__title--primary {
  filter: url('#underwater');
  font-size: 110%;
  font-weight: 900;
  line-height: 1;
  -webkit-text-stroke: 0 currentColor;
  -webkit-text-fill-color: currentColor;
}
</style>
