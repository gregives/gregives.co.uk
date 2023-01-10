<template>
  <main class="meta">
    <h1 v-if="text" class="meta__title">
      <span class="meta__title--primary">{{ text }}</span>
    </h1>
    <h1 v-else class="meta__title">
      Hi, I’m <span class="meta__title--primary">Greg Ives</span>
    </h1>
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

  min-height: 100vh !important;
}

.meta__title {
  @include title;

  bottom: 5%;
  position: absolute;
  width: 65%;
}

.meta__title--primary {
  @include title--primary;
}

// Override external styles
body {
  overflow: hidden;
}

#__app {
  transform: scale(1.5);
  transform-origin: bottom left;
}

.header,
.footer {
  display: none;
}
</style>
