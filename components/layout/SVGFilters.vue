<template>
  <svg>
    <filter id="noise">
      <feTurbulence
        type="fractalNoise"
        baseFrequency="6.3"
        numOctaves="6"
        stitchTiles="stitch"
        result="colorNoise"
      />
      <feColorMatrix
        in="colorNoise"
        type="matrix"
        values=".33 .33 .33 0 0 .33 .33 .33 0 0 .33 .33 .33 0 0 0 0 0 .2 0"
        result="monoNoise"
      />
      <feComposite operator="out" in="SourceGraphic" in2="monoNoise" />
    </filter>
  </svg>
</template>
