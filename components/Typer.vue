<template>
  <span class="typer" :class="{ selected }">
    <span>{{ currentType }}</span>
    <span v-for="word in words" :key="word">{{ word }}</span>
  </span>
</template>

<script>
export default {
  data() {
    return {
      words: [
        'Greg Ives',
        'a developer',
        'a hacker',
        'a designer',
        'a teacher'
      ],
      currentType: 'Greg Ives',
      currentWord: 0,
      selected: false
    }
  },
  mounted() {
    this.currentType = this.words[0]
    this.currentWord = 0

    const type = () => {
      // If the word has finished typing
      if (this.currentType.length === this.words[this.currentWord].length) {
        this.currentWord = (this.currentWord + 1) % this.words.length
        return setTimeout(() => {
          this.selected = true
          setTimeout(() => {
            this.currentType = ''
            setTimeout(type, 300 + Math.random() * 500)
          }, 200 + Math.random() * 300)
        }, 1000 + Math.random() * 2000)
      }

      this.selected = false

      // Get the current length
      const length = this.currentType.length
      this.currentType += this.words[this.currentWord][length]
      return setTimeout(type, 25 + Math.random() * 100)
    }

    setTimeout(type, 2000)
  }
}
</script>

<style lang="scss">
@import '~/assets/sass/_variables';

.typer {
  animation-duration: 400ms;
  animation-direction: alternate;
  animation-iteration-count: infinite;
  animation-name: blink;
  border-right: solid 1vmin $color-primary;
  color: $color-primary;
  position: relative;

  span {
    white-space: pre;

    ~ span {
      display: none;
    }
  }

  &.selected {
    background-color: transparentize($color: $color-primary, $amount: 0.9);
    border-right: none;
    border-left: solid 1vmin $color-primary;
    margin-left: -1vmin;
  }

  @keyframes blink {
    from {
      border-color: transparent;
    }

    to {
      border-color: transparentize($color: $color-primary, $amount: 0.5);
    }
  }
}
</style>
