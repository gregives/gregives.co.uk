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
        statically generated using Nuxt. I am an avid hackathoner, attending
        hackathons across Europe and organising
        <a href="https://hackSheffield.co" target="_blank">hackSheffield</a>
        for the past three years. I am a strong believer that you can learn
        just as much in your spare time as in education &mdash; most of my
        knowledge has come from hackathons and my side projects.
      </p>
      <p>
        This summer I worked as an intern at
        <a href="https://financialforce.com" target="_blank">FinancialForce</a>,
        building an app for the Salesforce platform with
        <a href="https://lwc.dev" target="_blank">Lightning Web Components</a>.
        I volunteer as an instructor at
        <a href="https://codefirstgirls.org.uk" target="_blank">
          Code First: Girls
        </a>,
        teaching young women and non-binary people to build their first website.
        I am also a teaching assistant at the University of Sheffield, teaching
        various modules to first year students.
      </p>
      <p>
        I'm looking for an opportunity in software development after I graduate
        in June 2020.
        <nuxt-link to="/contact">Get in touch with me</nuxt-link>
        for a copy of my CV and to have a chat!
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
