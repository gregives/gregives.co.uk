<template>
  <span class="interpolation" :style="styles">
    <span
      :class="{
        'interpolation__output--variable': step < 4,
        'interpolation__output--animate': step === 4,
        'interpolation__output--animate-delay': step === 5,
        'interpolation__output--animate-multiple': step === 6,
        'interpolation__output--animate-variable': step === 7
      }"
      class="interpolation__output"
    ></span>
    <span v-if="step !== 4" class="interpolation__controls">
      <span v-if="step > 1 && step < 5" class="interpolation__control">
        <label>
          {{ step === 2 ? 'Start' : 'H' }}
          <input v-model.number="hStart" type="number" min="0" max="360" />
        </label>
        <label v-if="step > 2">
          S
          <input v-model.number="sStart" type="number" min="0" max="100" />
        </label>
        <label v-if="step > 2">
          L
          <input v-model.number="lStart" type="number" min="0" max="100" />
        </label>
      </span>
      <span v-if="step === 5" class="interpolation__control">
        <label>
          Start
          <input v-model="colorStart" type="color" />
        </label>
      </span>
      <span class="interpolation__control interpolation__control--range">
        <label>
          Progress
          <input v-model.number="progress" type="range" min="0" max="100" />
        </label>
      </span>
      <span v-if="step > 1 && step < 5" class="interpolation__control">
        <label>
          {{ step === 2 ? 'End' : 'H' }}
          <input v-model.number="hEnd" type="number" min="0" max="360" />
        </label>
        <label v-if="step > 2">
          S
          <input v-model.number="sEnd" type="number" min="0" max="100" />
        </label>
        <label v-if="step > 2">
          L
          <input v-model.number="lEnd" type="number" min="0" max="100" />
        </label>
      </span>
      <span v-if="step === 5" class="interpolation__control">
        <label>
          End
          <input v-model="colorEnd" type="color" />
        </label>
      </span>
    </span>
  </span>
</template>

<script>
export default {
  props: {
    step: {
      type: Number,
      required: true
    }
  },
  data() {
    return {
      hStart: 0,
      sStart: 100,
      lStart: 50,
      hEnd: 120,
      sEnd: 100,
      lEnd: 50,
      colorStart: '#ff0000',
      colorEnd: '#00ff00',
      progress: 40
    }
  },
  computed: {
    styles() {
      return {
        '--h-s': this.hStart,
        '--s-s': this.sStart + '%',
        '--l-s': this.lStart + '%',
        '--h-e': this.hEnd,
        '--s-e': this.sEnd + '%',
        '--l-e': this.lEnd + '%',
        '--color-s': this.colorStart,
        '--color-e': this.colorEnd,
        '--progress': this.progress
      }
    }
  }
}
</script>

<style lang="scss">
.interpolation {
  background-color: $color__body--overlay;
  border-radius: $border-radius;
  box-shadow: $box-shadow;
  display: block;
  overflow: hidden;
  margin-bottom: 2rem;
}

@keyframes progress {
  from {
    background-color: var(--color-s);
  }

  to {
    background-color: var(--color-e);
  }
}

@keyframes progress-multiple {
  0% {
    background-color: red;
  }

  32.5% {
    background-color: orange;
  }

  50% {
    background-color: yellow;
  }

  100% {
    background-color: lime;
  }
}

@keyframes progress-variable {
  from {
    --hue: 0;
    --saturation: 100%;
    --lightness: 50%;
  }

  to {
    --hue: 120;
    --saturation: 100%;
    --lightness: 50%;
  }
}

@property --hue {
  syntax: '<number> | <angle>';
  inherits: false;
  initial-value: 0;
}

@property --saturation {
  syntax: '<percentage>';
  inherits: false;
  initial-value: 100%;
}

@property --lightness {
  syntax: '<percentage>';
  inherits: false;
  initial-value: 50%;
}

.interpolation__output {
  display: block;
  padding: 2rem;

  &--variable {
    background-color: hsl(
      calc(var(--h-s) + (var(--h-e) - var(--h-s)) * var(--progress) / 100)
        calc(var(--s-s) + (var(--s-e) - var(--s-s)) * var(--progress) / 100)
        calc(var(--l-s) + (var(--l-e) - var(--l-s)) * var(--progress) / 100)
    );
  }

  &--animate {
    animation: 3s linear infinite alternate progress;
  }

  &--animate-delay {
    animation: 101s linear paused progress;
    animation-delay: calc(-1s * var(--progress));
  }

  &--animate-multiple {
    animation: 101s ease-in-out paused progress-multiple;
    animation-delay: calc(-1s * var(--progress));
  }

  &--animate-variable {
    animation: 101s linear paused progress-variable;
    animation-delay: calc(-1s * var(--progress));
    background-color: hsl(var(--hue) var(--saturation) var(--lightness));
  }
}

.interpolation__controls {
  display: flex;
  padding: 0.25rem 0.5rem 0.5rem;

  > :not(:first-child) {
    margin-left: 0.5rem;
  }
}

.interpolation__control {
  &--range {
    flex-grow: 1;
  }

  label {
    font-size: 80%;

    > input {
      display: block;

      &[type='range'] {
        margin-top: 0.25rem;
        width: 100%;
      }

      &[type='color'] {
        background-color: $color__body--overlay;
        border: none;
        padding: 0;
      }

      &[type='number'] {
        background-color: $color__body;
        border-radius: $border-radius !important;
        border: $border-weight solid $color__primary--muted;
        color: $color__text;
        padding-left: 0.25rem;
        width: 3.5rem;

        &:hover,
        &:focus {
          border-color: $color__primary;
        }

        &:focus {
          outline: none;
        }
      }
    }
  }
}
</style>
