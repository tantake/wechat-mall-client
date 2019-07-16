<template>
  <div id="app">
    <div>
      <router-view/>
    </div>
    <footer-bar class="footer"></footer-bar>
  </div>
</template>

<script>
import Footer from "./components/FooterBar";
export default {
  name: "App",
  components: {
    "footer-bar": Footer
  }
};
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}
</style>
