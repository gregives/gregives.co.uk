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
      <p>
        Hi there, I'm Greg Ives! I'm in my final year at the University of
        Sheffield, studying a masters in Computer Science. I love making things
        which work well, look good and are accessible to everyone.
      </p>
      <p>
        I have a lot of experience building performant and accessible websites.
        Recently, I have been focusing on JAMstack &mdash; this website is
        statically generated using Nuxt.
      </p>
    </div>
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

.about__image {
  img {
    border-radius: $border-radius;
  }

  @media (min-width: $breakpoint--lg) {
    float: left;
    margin-right: 2rem;
    width: calc(50% - 1rem) !important;
  }
}

.about__text {
  img {
    margin-bottom: 1rem;
  }

  p {
    margin-bottom: 1rem;
  }
}
</style>
