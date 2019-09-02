<template>
  <div>{{ title }}</div>
</template>

<script>
export default {
  data() {
    return {
      title: 'Hype',
      date: new Date(2016, 10),
      description:
        "Product of my first hackathon. Hype, an Android app to 'hype' a location or event, which can be viewed on an interactive map."
    }
  }
}
</script>
