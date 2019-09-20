<template>
  <main class="about">
    <h1 class="about__title">
      A Little <span class="about__title--primary">About</span> Me
    </h1>
  </main>
</template>

<style lang="scss">
.about {
  @include container;
  padding: 3rem 0;
}

.about__title--primary {
  filter: url('#underwater');
  font-size: 110%;
  font-weight: 900;
  line-height: 1;
  -webkit-text-stroke: 0 currentColor;
  -webkit-text-fill-color: currentColor;
}
</style>
