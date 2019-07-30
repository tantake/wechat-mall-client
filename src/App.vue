<template>
  <div id="app">
    <div>
      <transition :name="transitionName">
        <router-view />
      </transition>
    </div>
    <footer-bar class="footer"></footer-bar>
    <!-- <img :src="goodsImg" alt=""> -->
  </div>
</template>

<script>
import Footer from "./components/FooterBar";
import goodsImg from "@/assets/images/520L-introduce.jpg";
export default {
  name: "App",
  data() {
    return {
      transitionName: "fold-left",
      pathArray: [],
      goodsImg: goodsImg
    };
  },
  components: {
    "footer-bar": Footer
  },
  watch: {
    $route(to, from) {
      this.$indicator.close();
      const toPath = to.path;
      const fromPath = from.path;
      let isForward = true;
      if (this.pathArray[0] === toPath) {
        isForward = false;
      }
      this.pathArray[0] = fromPath;
      this.pathArray[1] = toPath;
      this.transitionName = isForward ? "fold-left" : "fold-right";
    }
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
.fold-left-enter-active {
  animation-name: fold-left-in;
  animation-duration: 0.5s;
}
.fold-left-leave-active {
  animation-name: fold-left-out;
  animation-duration: 0.5s;
}
@keyframes fold-left-in {
  0% {
    -webkit-transform: translate3d(100%, 0, 0);
    transform: translate3d(100%, 0, 0);
  }
  100% {
    -webkit-transform: translate3d(0, 0, 0);
    transform: translate3d(0, 0, 0);
  }
}
@keyframes fold-left-out {
  0% {
    -webkit-transform: translate3d(0, 0, 0);
    transform: translate3d(0, 0, 0);
  }
  100% {
    -webkit-transform: translate3d(-100%, 0, 0);
    transform: translate3d(-100%, 0, 0);
  }
}

.fold-right-enter-active {
  animation-name: fold-right-in;
  animation-duration: 0.3s;
}
.fold-right-leave-active {
  animation-name: fold-right-out;
  animation-duration: 0.3s;
}
@keyframes fold-right-in {
  0% {
    width: 100%;
    -webkit-transform: translate3d(-100%, 0, 0);
    transform: translate3d(-100%, 0, 0);
  }
  100% {
    width: 100%;
    -webkit-transform: translate3d(0, 0, 0);
    transform: translate3d(0, 0, 0);
  }
}
@keyframes fold-right-out {
  0% {
    width: 100%;
    -webkit-transform: translate3d(0, 0, 0);
    transform: translate3d(0, 0, 0);
  }
  100% {
    width: 100%;
    -webkit-transform: translate3d(100%, 0, 0);
    transform: translate3d(100%, 0, 0);
  }
}
</style>
