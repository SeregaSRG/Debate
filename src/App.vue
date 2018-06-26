<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App',
  components: {
  }
}
</script>

<style lang="scss">
  @import 'main.scss';

  @font-face {
    font-family: 'Proxima Nova Semibold';
    src: url('./assets/fonts/ProximaNova-Semibold.woff') format('woff'),
    url('./assets/fonts/ProximaNova-Semibold.eot') format('eot'),
    url('./assets/fonts/ProximaNova-Semibold.ttf') format('truetype'),
    url('./assets/fonts/ProximaNova-Semibold.svg#svgFontName') format('svg');
    font-weight: normal;
    font-style: normal;
  }

  @font-face {
    font-family: 'Proxima Nova Light';
    src: url('./assets/fonts/ProximaNova-Light.woff') format('woff'),
    url('./assets/fonts/ProximaNova-Light.eot') format('eot'),
    url('./assets/fonts/ProximaNova-Light.ttf') format('truetype'),
    url('./assets/fonts/ProximaNova-Light.svg#svgFontName') format('svg');
    font-weight: normal;
    font-style: normal;
  }

  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: 'roxima Nova Light', sans-serif;
  }

  #app {
    font-family: 'roxima Nova Light', sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    width: 100vw;
    height: 100vh;
    overflow: hidden;
    position: relative;
  }

  body {
    background: $background-color;
  }
</style>
