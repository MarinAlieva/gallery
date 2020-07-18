<template>
  <div id="app">
    <h2>Тестовое задание на позицию фронтенд-инженера</h2>
    <ImageLoad />
    <Gallery />
  </div>
</template>

<script>
import Gallery from './components/Gallery.vue'
import ImageLoad from './components/ImageLoad.vue'

export default {
  name: 'App',
  components: {
    Gallery,
    ImageLoad
  }
}
</script>

<style>
html {
  overflow-y: scroll;
}
body {
  margin: 0px;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
