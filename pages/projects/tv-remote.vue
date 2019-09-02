<template>
  <div>{{ title }}</div>
</template>

<script>
export default {
  data() {
    return {
      title: 'TV Remote',
      date: new Date(2018, 11),
      description:
        'Firmware for the unPhone, a souped-up ESP32 with an LCD touchscreen, to control televisions from a number of manufacturers.'
    }
  }
}
</script>
