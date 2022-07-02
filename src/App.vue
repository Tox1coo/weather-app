<template>
  <Home></Home>
</template>

<script>
import Home from '@/views/Home.vue'
export default {
  components: {Home},

  mounted() {
    let app = document.getElementById('app');
    const date = new Date().getHours();
    if(date >= 9) {
      app.style.cssText = `background: url(${require('@/assets/mount.jpg')}) #ccc center no-repeat; background-size: cover`
    } else {
      app.style.cssText = `background: url(${require('@/assets/night.jpg')}) #ccc center no-repeat; background-size: cover`
    }
  }
}
</script>
<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  height: 100%;
  overflow: hidden;
}

body {
  width: 100%;
  height: 100vh;;
  overflow: hidden;
  margin: 0;
}



</style>
