<template>
  <div>{{ title }}</div>
</template>

<script>
export default {
  data() {
    return {
      title: 'StegaPhoto',
      date: new Date(2017, 9),
      description:
        'Cyber security research project on steganography — created a web application which can hide any number of files inside an image.'
    }
  }
}
</script>
