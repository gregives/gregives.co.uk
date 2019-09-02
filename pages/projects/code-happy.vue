<template>
  <div>{{ title }}</div>
</template>

<script>
export default {
  data() {
    return {
      title: 'Code Happy',
      date: new Date(2019, 3),
      description:
        "How happy are you when you code? Code Happy, created at START Hack, uses Microsoft's Face API to track how happy you are when you code."
    }
  }
}
</script>
