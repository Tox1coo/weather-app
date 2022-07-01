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
    await this.getAllCountryList();
  },


  computed: {
    ...mapActions({
      getAllCountryList: "weather/getAllCountryList",
    }),
  },

};
</script>
