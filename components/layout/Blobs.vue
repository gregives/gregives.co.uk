<template>
  <div class="blobs">
    <div class="blobs__blob"></div>
    <div class="blobs__blob"></div>
    <div class="blobs__blob"></div>
    <div class="blobs__blob"></div>
    <div class="blobs__blob"></div>
    <div class="blobs__blob"></div>
  </div>
</template>

<style lang="scss">
$transition-length: 1500ms;

.blobs {
  display: none;
  height: 100vh;
  height: calc(var(--vh, 1vh) * 100);
  left: 0;
  pointer-events: none;
  position: fixed;
  top: 0;
  transform: none;
  transition: transform $transition-length $transition__normal;
  width: 100vw;
  z-index: 10000;

  @supports (pointer-events: none) {
    display: block;
  }
}

.blobs__blob {
  background-color: $color__body--overlay;
  mask-size: contain;
  padding-bottom: 20rem;
  position: absolute;
  transform: translate(-50%, -50%) scale(0);
  transition: transform $transition-length $transition__normal;
  width: 20rem;

  &:nth-child(1) {
    left: 20%;
    top: 20%;
    mask-image: url('data:image/svg+xml;utf8,<svg viewBox="0 0 600 600" xmlns="http://www.w3.org/2000/svg"><g transform="translate(300, 300)"><path d="M116,-187.9C140.1,-165,142.4,-115.5,166.7,-73C191.1,-30.4,237.6,5.199999999999999,250.6,48.4C263.7,91.6,243.3,142.4,203.1,159.9C162.9,177.4,102.9,161.6,58.9,152.5C15,143.3,-12.8,140.7,-41.2,134.9C-69.6,129,-98.7,119.8,-132.2,102.6C-165.7,85.4,-203.6,60,-206.1,30.7C-208.6,1.4,-175.7,-31.9,-155.7,-69.2C-135.8,-106.6,-128.7,-147.9,-104.9,-170.9C-81.1,-193.9,-40.5,-198.4,2.7,-202.6C46,-206.8,91.9,-210.7,116,-187.9Z"></path></g></svg>');
  }

  &:nth-child(2) {
    left: 80%;
    top: 0;
    mask-image: url('data:image/svg+xml;utf8,<svg viewBox="0 0 600 600" xmlns="http://www.w3.org/2000/svg"><g transform="translate(300, 300)"><path d="M146.3,-225C191.3,-198.7,230.7,-161,233.3,-117.6C235.9,-74.2,201.6,-25.1,167.9,5.300000000000001C134.2,35.7,101.1,47.3,83.8,79.4C66.6,111.6,65.1,164.2,42.7,192.3C20.2,220.4,-23.3,223.9,-63.8,213.6C-104.2,203.3,-141.7,179.3,-150.8,144.3C-160,109.3,-140.9,63.4,-154.4,17.7C-167.9,-27.9,-214,-73.4,-214.8,-109.1C-215.6,-144.8,-171.1,-170.8,-127.7,-197.9C-84.3,-224.9,-42.2,-253,4.2,-259.5C50.6,-266.1,101.3,-251.3,146.3,-225Z"></path></g></svg>');
  }

  &:nth-child(3) {
    left: 90%;
    top: 50%;
    mask-image: url('data:image/svg+xml;utf8,<svg viewBox="0 0 600 600" xmlns="http://www.w3.org/2000/svg"><g transform="translate(300, 300)"><path d="M98.1,-133.5C141.5,-124.8,200.8,-121.8,213.5,-96.7C226.2,-71.6,192.3,-24.4,163,7.6C133.8,39.6,109.2,56.5,92.5,85.8C75.9,115.1,67.1,156.9,39.3,191.2C11.6,225.5,-35.2,252.3,-69.8,240.7C-104.3,229.1,-126.6,179.1,-139.1,136.3C-151.7,93.5,-154.5,58.1,-166.4,19.8C-178.3,-18.4,-199.2,-59.5,-193.8,-95.6C-188.4,-131.8,-156.6,-163.1,-119.9,-174.8C-83.3,-186.6,-41.6,-178.8,-7.1000000000000005,-167.7C27.4,-156.6,54.8,-142.2,98.1,-133.5Z"></path></g></svg>');
  }

  &:nth-child(4) {
    left: 30%;
    top: 60%;
    mask-image: url('data:image/svg+xml;utf8,<svg viewBox="0 0 600 600" xmlns="http://www.w3.org/2000/svg"><g transform="translate(300, 300)"><path d="M82.2,-126.1C108.9,-110.7,134.5,-91.9,150.8,-66C167.1,-40.1,174.1,-7,178.9,32.5C183.7,71.9,186.3,117.8,160.8,129.5C135.3,141.1,81.8,118.5,39.3,128.5C-3.099999999999998,138.5,-34.4,181,-73.1,194.5C-111.8,208,-157.9,192.4,-168.4,158.2C-178.9,124,-153.8,71.3,-149.1,28.4C-144.3,-14.4,-159.9,-47.3,-155.4,-76.7C-150.9,-106.2,-126.3,-132.2,-97,-146.3C-67.8,-160.4,-33.9,-162.7,-3.0999999999999996,-158C27.8,-153.2,55.5,-141.4,82.2,-126.1Z"></path></g></svg>');
  }

  &:nth-child(5) {
    left: 70%;
    top: 80%;
    mask-image: url('data:image/svg+xml;utf8,<svg viewBox="0 0 600 600" xmlns="http://www.w3.org/2000/svg"><g transform="translate(300, 300)"><path d="M85.1,-127.4C104.2,-120.1,109.4,-86.2,110.6,-58C111.7,-29.8,108.8,-7.300000000000001,124.1,31.2C139.4,69.7,172.9,124.3,159.5,136.3C146.1,148.3,85.9,117.8,42.6,118.4C-0.8,119,-27.1,150.6,-66.9,166.9C-106.7,183.1,-159.9,183.9,-185,158.4C-210,132.9,-207,81.1,-206,34.5C-205.1,-12,-206.2,-53.4,-189.3,-84.8C-172.3,-116.1,-137.3,-137.6,-102.7,-137.8C-68.1,-138,-34.1,-117,-0.5,-116.2C33,-115.3,66,-134.6,85.1,-127.4Z"></path></g></svg>');
  }

  &:nth-child(6) {
    left: 10%;
    top: 90%;
    mask-image: url('data:image/svg+xml;utf8,<svg viewBox="0 0 600 600" xmlns="http://www.w3.org/2000/svg"><g transform="translate(300, 300)"><path d="M95.7,-128.4C131.9,-125.6,174.7,-112.5,203.8,-83C233,-53.5,248.7,-7.8,225.3,19.9C201.9,47.6,139.5,57.2,101.5,71.5C63.5,85.8,49.900000000000006,104.8,24.5,136.5C-0.8999999999999986,168.2,-38.2,212.7,-67.1,211.8C-95.9,210.9,-116.4,164.7,-140.4,127.1C-164.4,89.6,-192.1,60.6,-189.2,31.7C-186.2,2.8999999999999986,-152.7,-25.700000000000003,-142.1,-71.5C-131.5,-117.3,-143.9,-180.2,-124,-190.5C-104.2,-200.7,-52.1,-158.4,-11.2,-141C29.7,-123.6,59.5,-131.2,95.7,-128.4Z"></path></g></svg>');
  }
}

.page-enter-active,
.page-leave-active,
.layout-enter-active,
.layout-leave-active {
  transition-delay: ($transition-length / 2);

  ~ .blobs {
    pointer-events: all;
  }
}

.page-enter,
.page-leave-to,
.layout-enter,
.layout-leave-to {
  ~ .blobs {
    .blobs__blob {
      transform: translate(-50%, -50%) scale(12);
    }
  }
}

.page-enter-active,
.layout-enter-active {
  ~ .blobs {
    transform: scale(1.5);
  }
}
</style>
