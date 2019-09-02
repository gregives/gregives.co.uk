<template>
  <div>{{ title }}</div>
</template>

<script>
export default {
  data() {
    return {
      title: 'Auto Clicker',
      date: new Date(2019, 7),
      description:
        'Desktop automation tool built using electron — control your mouse and keyboard using programmable scripts. Work in progress.'
    }
  }
}
</script>
