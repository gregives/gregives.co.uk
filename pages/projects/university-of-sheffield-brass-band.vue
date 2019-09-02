<template>
  <div>{{ title }}</div>
</template>

<script>
export default {
  data() {
    return {
      title: 'University of Sheffield Brass Band',
      shortTitle: 'USBB',
      date: new Date(2019, 3),
      description:
        'Website designed and created for the University of Sheffield Brass Band, of which I am a proud member. Uses Jekyll for easy content management.'
    }
  }
}
</script>
