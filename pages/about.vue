<template>
  <main class="about">
    <h1 class="about__title">
      A Little <span class="about__title--primary">About</span> Me
    </h1>
    <div class="about__text">
      <div class="about__image">
        <lazy-image
          src="/assets/images/dynamic/about.jpg"
          alt="Greg Ives at HackSheffield"
          sizes="(min-width: 768px) 50vw, 100vw"
        />
      </div>
      <markdown :markdown="markdown" />
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
  @include page;
}

.about__title {
  @include title;
}

.about__title--primary {
  @include title--primary;
}

.about__text {
  display: grid;
  grid-gap: 4.5rem;
  grid-template-columns: 100%;

  @media (min-width: $breakpoint--md) {
    grid-gap: 3rem;
    grid-template-columns: minmax(0, 1fr) minmax(0, 1fr);
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
    padding-bottom: math.div(2, 3) * 100%;
    position: absolute;
    top: 1.5rem;
    width: 100%;
    z-index: -1;
  }

  &::after {
    background-image: linear-gradient(
      $color__transparent,
      $color__primary--muted
    );
    border-radius: $border-radius;
    content: '';
    left: 1.5rem;
    margin-top: 2 * $border-weight;
    padding-bottom: math.div(2, 3) * 100%;
    position: absolute;
    top: 1.5rem;
    width: 100%;
    z-index: -1;
  }
}
</style>
