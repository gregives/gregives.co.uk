<template>
  <main class="about">
    <h1 class="about__title">
      A Little <span class="about__title--primary">About</span> Me
    </h1>
    <div class="about__text">
      <lazy-image
        class="about__image"
        src="about/hacksheffield.jpg"
        alt="Greg Ives at HackSheffield"
      />
      <markdown :vue="vue" />
    </div>
  </main>
</template>

<script>
export default {
  async asyncData() {
    const { vue } = await import('~/contents/about.md')
    return {
      vue
    }
  },
  head() {
    return {
      title: 'About'
    }
  }
}
</script>

<style lang="scss">
.about {
  $clip-path: polygon(0% 10%, 200% 45%, 0% 35%);
  @include page;
  @include dots($clip-path);
}

@media (min-width: $breakpoint--md) {
  .about {
    $clip-path: polygon(
      0% 10%,
      30% 30%,
      30% 50%,
      0% 60%,
      0% 80%,
      20% 60%,
      40% 70%,
      30% 200%,
      20% 60%,
      0% 80%
    );
    @include dots($clip-path);
  }
}

.about__title {
  @include title;
}

.about__title--primary {
  @include title--primary;
}

.about__text {
  display: grid;
  grid-gap: 3rem;
  grid-template-columns: 100%;

  @media (min-width: $breakpoint--md) {
    grid-template-columns: 1fr 1fr;
  }
}

.about__image {
  position: relative;
  width: calc(100% - 1.5rem) !important;

  img {
    border-radius: $border-radius;
  }

  &::before {
    background-color: $color--body-overlay;
    border: $border-weight solid $color--primary-muted;
    border-radius: $border-radius;
    box-shadow: $box-shadow;
    content: '';
    left: 1.5rem;
    padding-bottom: 2 / 3 * 100%;
    position: absolute;
    top: 1.5rem;
    width: 100%;
    z-index: -1;
  }
}
</style>
