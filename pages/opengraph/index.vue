<template>
  <main class="preview">
    <h1 class="preview__title">
      Hi, I’m <span class="preview__title--primary">Greg Ives</span>
    </h1>
  </main>
</template>

<style lang="scss">
.preview {
  $clip-path: polygon(10% 0%, 50% 100%, 100% 100%, 100% 0%);
  @include page;
  @include dots($clip-path);

  min-height: 100vh !important;
}

.preview__title {
  @include title;

  bottom: 5%;
  position: absolute;
}

.preview__title--primary {
  @include title--primary;
}

// Override external styles
body {
  overflow: hidden;
}

#__app {
  transform: scale(1.5);
  transform-origin: bottom left;
}

.header,
.footer {
  display: none;
}
</style>
