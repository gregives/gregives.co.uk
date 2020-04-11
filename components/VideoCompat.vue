<template>
  <video>
    <source :src="srcWebm" type="video/webm" />
    <source :src="srcMp4" type="video/mp4" />
  </video>
</template>

<script>
export default {
  props: {
    src: {
      type: String,
      required: true
    }
  },
  computed: {
    srcWebm() {
      return require(`~/assets/videos/${this.src}.webm`)
    },
    srcMp4() {
      return require(`~/assets/videos/${this.src}.mp4`)
    }
  }
}
</script>
