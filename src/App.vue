<template>
  <Home></Home>
</template>

<script>
import { mapActions } from "vuex";

import Home from "@/views/Home.vue";
export default {
  components: { Home },

  async mounted() {
    let app = document.getElementById("app");
    const time = new Date().getHours();
    if (time >= 9 && time <= 19) {
      app.style.cssText = `background: url(${require("@/assets/mount.jpg")}) #ccc center no-repeat; background-size: cover`;
    } else {
      app.style.cssText = `background: url(${require("@/assets/night.jpg")}) #ccc center no-repeat; background-size: cover`;
    }
    await this.getAllCountryList();
  },
  methods: {
    ...mapActions({
      getAllCountryList: "dbCountry/getAllCountryList",
    }),
  },
};
</script>
<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  height: 100%;
  overflow: hidden;
  overflow-y: scroll;
}

body {
  width: 100%;
  height: 100vh;
  overflow: hidden;
  margin: 0;
}

::-webkit-scrollbar {
  width: 0;
}
</style>
