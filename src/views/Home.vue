<template>
  <NavBar :check="isLoading"></NavBar>
  <WeatherBlock v-if="isLoading"></WeatherBlock>
</template>

<script>
/* eslint-disable no-unused-vars */

import { mapActions, mapState } from "vuex";
import WeatherBlock from "@/components/WeatherBlock/WeatherBlock.vue";
import axios from "axios";
export default {
  components: { WeatherBlock },

  mounted() {
    this.getInfoUser();
  },

  methods: {
    ...mapActions({
      getInfoUser: "dbCountry/getInfoUser",
    }),
  },
  computed: {
    ...mapState({
      isLoading: (state) => state.dbCountry.isLoading,
    }),
  },
};
</script>
