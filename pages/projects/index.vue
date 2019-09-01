<template>
  <div class="container">
    <ol id="projects">
      <li v-for="project in projects" :key="project.title">
        <nuxt-link :to="link(project)">
          <div>
            <img src="https://via.placeholder.com/800x400" alt />
            <h3>{{ title(project) }}</h3>
            <p>{{ project.description }}</p>
          </div>
        </nuxt-link>
      </li>
    </ol>
  </div>
</template>

<script>
import androidApps from './android-apps'
import autoClicker from './auto-clicker'
import ciscoUniversityChallenge from './cisco-university-challenge'
import codeHappy from './code-happy'
import dissertation from './dissertation'
import festimap from './festimap'
import hacksheffield from './hacksheffield'
import hype from './hype'
import picnicSpots from './picnic-spots'
import portfolio from './portfolio'
import snapscroll from './snapscroll'
import stegaphoto from './stegaphoto'
import tvRemote from './tv-remote'
import universityOfSheffieldBrassBand from './university-of-sheffield-brass-band'

export default {
  data() {
    return {
      projects: [
        androidApps.data(),
        autoClicker.data(),
        ciscoUniversityChallenge.data(),
        codeHappy.data(),
        dissertation.data(),
        festimap.data(),
        hacksheffield.data(),
        hype.data(),
        picnicSpots.data(),
        portfolio.data(),
        snapscroll.data(),
        stegaphoto.data(),
        tvRemote.data(),
        universityOfSheffieldBrassBand.data()
      ].sort((a, b) => b.date - a.date)
    }
  },
  methods: {
    title(project) {
      return project.shortTitle || project.title
    },
    link(project) {
      return (
        '/projects/' +
        this.title(project)
          .toLowerCase()
          .replace(' ', '-')
      )
    }
  }
}
</script>

<style lang="scss">
@import '~/assets/sass/_variables';

#projects {
  display: grid;
  grid-template-columns: 1fr;
  grid-gap: calc(6rem + 3vmin) calc(3rem + 3vmin);
  margin-top: 3rem;
  margin-bottom: 10vh;

  @media (min-width: $break-sm) {
    grid-template-columns: 1fr 1fr;
  }

  @media (min-width: $break-lg) {
    grid-template-columns: 1fr 1fr 1fr;
  }

  li {
    margin: -1.5rem;
    padding: 0rem;
    position: relative;

    > a {
      display: block;
      margin: 0;
      padding: 1.5rem;
      white-space: initial;

      &::after {
        display: none;
      }

      &::before {
        background: none;
        border: solid 2px transparentize(black, 0.95);
        box-sizing: content-box;
        content: '';
        height: 95%;
        left: 0.5rem;
        position: absolute;
        transition: border 300ms ease;
        top: 5%;
        width: calc(100% - 1rem);
      }

      &:hover::before {
        border: solid 2px transparentize($color-primary, 0.4);
      }

      > div {
        height: 100%;
        width: 100%;

        img {
          margin-top: -3rem;
          margin-bottom: 0.75rem;
          width: 80%;
        }
      }
    }

    @for $i from 1 through 14 {
      &:nth-child(#{$i}) > a::before,
      &:nth-child(#{$i}) > a::after {
        transform: rotate(#{random() * 4 - 2}deg);
      }
    }
  }

  p {
    font-size: 90%;
  }
}
</style>
