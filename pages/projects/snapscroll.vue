<template>
  <div>{{ title }}</div>
</template>

<script>
export default {
  data() {
    return {
      title: 'SnapScroll',
      date: new Date(2017, 8),
      description:
        'My first JavaScript library, designed to scroll smoothly between points on a website. Scroll jacking is bad, please do not use.'
    }
  }
}
</script>
