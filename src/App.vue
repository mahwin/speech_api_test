<template>
  <div id="app">
    <speech-comp/>
  </div>
</template>

<script>
import SpeechComp from './components/SpeechComp.vue'

export default {
  name: 'App',
  components: {
    SpeechComp
  }
}
</script>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
