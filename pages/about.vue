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
import Markdown from '~/components/Markdown'

export default {
  components: {
    Markdown
  },
  async asyncData() {
    const { vue } = await import('~/contents/about.md')
    return {
      vue
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

  @media (min-width: $breakpoint--lg) {
    grid-template-columns: 1fr 1fr;
    grid-gap: calc(1rem + 5vmin);
  }
}

.about__image {
  margin-bottom: 1rem;

  img {
    border-radius: $border-radius;
  }
}
</style>
