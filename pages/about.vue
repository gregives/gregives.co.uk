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
