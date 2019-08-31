<template>
  <div class="shapes shapes-full">
    <div data-tilt>
      <div class="triangle"></div>
      <div class="circle"></div>
      <div class="square"></div>
    </div>
  </div>
</template>

<style lang="scss">
.shapes {
  $shape-gradient: linear-gradient(
    to bottom right,
    darken(white, 2%),
    darken(white, 6%)
  );
  $shape-size: calc(80px + 10vw);
  pointer-events: none;

  .square {
    background-image: $shape-gradient;
    height: $shape-size;
    width: $shape-size;
  }

  .circle {
    background-image: $shape-gradient;
    border-radius: 50%;
    height: $shape-size;
    width: $shape-size;
  }

  .triangle {
    height: $shape-size;
    overflow: hidden;
    position: relative;
    width: $shape-size;

    &::after {
      background-image: $shape-gradient;
      content: '';
      height: 150%;
      left: 0;
      transform: rotate(45deg);
      transform-origin: top left;
      position: absolute;
      top: 0;
      width: 150%;
    }
  }
}

.shapes-full {
  height: 100%;
  left: 0;
  overflow: hidden;
  position: absolute;
  top: 0;
  width: 100%;

  > div {
    height: 100%;
    left: 0;
    position: absolute;
    top: 0;
    width: 100%;

    div {
      position: absolute;
    }

    :nth-child(1) {
      left: calc(20% - 50px);
      top: 20%;
      transform: rotate(20deg) translate(-50%, -50%);
    }

    :nth-child(2) {
      left: 50%;
      top: 25%;
      transform: scale(0.6) translate(-50%, -50%);
    }

    :nth-child(3) {
      left: calc(60% + 100px);
      top: 10%;
      transform: rotate(60deg) scale(0.8) translate(-50%, -50%);
    }
  }
}
</style>
