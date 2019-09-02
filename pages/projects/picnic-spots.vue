<template>
  <div>{{ title }}</div>
</template>

<script>
export default {
  data() {
    return {
      title: 'Picnic Spots',
      date: new Date(2019, 4),
      description:
        'Website created at HackBordeaux in 24 hours. View, add and review the best places to eat your tuna sweetcorn sandwiches.'
    }
  }
}
</script>
