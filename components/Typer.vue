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
      currentType: null,
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
          }, 300 + Math.random() * 500)
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
  color: $colour-primary;
  margin: 0 -0.01em;
  position: relative;

  span {
    white-space: pre;

    ~ span {
      display: none;
    }
  }

  &::after {
    animation-duration: 400ms;
    animation-direction: alternate;
    animation-iteration-count: infinite;
    animation-name: blink;
    content: '';
    height: 100%;
    left: 100%;
    position: absolute;
    top: 0;
    width: 1vmin;
  }

  &.selected {
    background-color: transparentize($color: $colour-primary, $amount: 0.9);

    &::after {
      left: auto;
      right: 100%;
    }
  }

  @keyframes blink {
    from {
      background-color: transparent;
    }

    to {
      background-color: transparentize($color: $colour-primary, $amount: 0.5);
    }
  }
}
</style>
