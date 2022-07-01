<template>
  <NavBar></NavBar>
</template>

<script>
/* eslint-disable no-unused-vars */

import { mapActions, mapState } from 'vuex';

export default {
  data() {
    return {

    }
  },

  async mounted() {
    await this.getAllCityList();
  },


  computed: {
    ...mapActions({
      getAllCityList: "weather/getAllCityList",
    }),
  },

};
</script>
