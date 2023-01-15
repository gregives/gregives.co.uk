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
  @include background(
    (
      (calc(50% - 30rem) calc(100% + 15rem) 30rem),
      (calc(50% - 25rem) 25rem 20rem)
    )
  );
}

.about__title {
  @include title;

  margin-bottom: 4rem;
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
}
</style>
