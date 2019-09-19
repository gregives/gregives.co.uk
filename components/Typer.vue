<template>
  <span class="typer" :class="{ 'typer--selected': selected }">
    <span class="typer__word">{{ currentType }}</span>
    <span v-for="word in words" :key="word" class="typer__word">{{
      word
    }}</span>
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
.typer {
  animation-duration: 400ms;
  animation-direction: alternate;
  animation-iteration-count: infinite;
  animation-name: blink;
  border-right: solid 1vmin $color--primary;
  color: $color--primary;
  position: relative;
}

.typer--selected {
  box-shadow: 0 -1.4em transparentize($color--primary, 0.9) inset;
  border-right: none;
  border-left: solid 1vmin $color--primary;
  margin-left: -1vmin;

  @keyframes blink {
    from {
      border-color: transparent;
    }

    to {
      border-color: transparentize($color--primary, 0.5);
    }
  }
}

.typer__word {
  white-space: pre;

  ~ .typer__word {
    display: none;
  }
}
</style>
