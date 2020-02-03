<template>
  <main class="about">
    <h1 class="about__title">
      A Little <span class="about__title--primary">About</span> Me
    </h1>
    <div class="about__text">
      <div class="about__image">
        <lazy-image
          src="about/hacksheffield.jpg"
          alt="Greg Ives at HackSheffield"
        />
      </div>
      <markdown :vue="markdown.vue" />
    </div>
  </main>
</template>

<script>
export default {
  async asyncData() {
    const { vue } = await import('~/contents/about.md')
    return {
      markdown: {
        vue
      }
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
  $clip-path: polygon(0% 15%, 100% 20%, 100% 30%, 0% 35%);
  @include page;
  @include dots($clip-path);

  @media (min-width: $breakpoint--md) {
    $clip-path: polygon(
      0% 20%,
      30% 30%,
      30% 50%,
      0% 60%,
      0% 70%,
      30% 60%,
      40% 70%,
      30% 200%,
      0% 100%
    );
    @include dots($clip-path);

    // HACK: Arbitrary property needed to keep breakpoint when minified
    color: inherit;
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

  &::before {
    background-color: $color__body--overlay;
    border: $border-weight solid $color__primary--muted;
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

  &::after {
    background-image: linear-gradient(transparent, $color__primary--muted);
    border-radius: $border-radius;
    content: '';
    left: 1.5rem;
    margin-top: 2 * $border-weight;
    padding-bottom: 2 / 3 * 100%;
    position: absolute;
    top: 1.5rem;
    width: 100%;
    z-index: -1;
  }
}
</style>
