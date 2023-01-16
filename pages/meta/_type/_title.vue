<template>
  <main class="meta">
    <h1 v-if="text" class="meta__title">
      <span class="meta__title--primary">{{ text }}</span>
    </h1>
    <h1 v-else class="meta__title">
      Hi, I’m <span class="meta__title--primary">Greg Ives</span>
    </h1>
    <p class="meta__link">gregives.co.uk</p>
  </main>
</template>

<script>
import { postLoader } from '~/contents/blog'
import { projectLoader } from '~/contents/projects'

export default {
  async asyncData({ params }) {
    if (params.type === 'blog') {
      try {
        const post = await postLoader(params.title)
        return {
          text: post.attributes.title
        }
      } catch {
        return {
          text: null
        }
      }
    } else {
      try {
        const project = await projectLoader(params.title)
        return {
          text: project.attributes.title
        }
      } catch {
        return {
          text: null
        }
      }
    }
  }
}
</script>

<style lang="scss">
.meta {
  @include page;
  @include background(((0 0 20rem), (calc(30% + 40rem) 0 40rem)));

  height: 100vh !important;
}

.meta__title {
  @include title;

  bottom: 15%;
  position: absolute;
  width: 65%;
}

.meta__title--primary {
  @include title--primary;
}

.meta__link {
  color: $color__text--muted;
  bottom: 8%;
  font-size: 200%;
  font-weight: 300;
  letter-spacing: 0.07em;
  position: absolute;
}

// Override external styles
body {
  overflow: hidden;
}

#__layout {
  transform: scale(1.3);
  transform-origin: bottom left;
}

.header,
.footer {
  display: none;
}
</style>
