<template>
  <div>{{ title }}</div>
</template>

<script>
export default {
  data() {
    return {
      title: 'Festimap',
      date: new Date(2019, 5),
      description:
        'Progressive web app designed to share photos at festivals around the globe. Created as part of a university project with a friend.'
    }
  }
}
</script>
