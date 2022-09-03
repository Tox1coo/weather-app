<template>
  <NavBar :check="isLoading"></NavBar>
  <WeatherBlock v-if="isLoading"></WeatherBlock>
  <IsLoading v-else></IsLoading>
</template>

<script>
/* eslint-disable no-unused-vars */

import { mapActions, mapState } from "vuex";
import WeatherBlock from "@/components/WeatherBlock/WeatherBlock.vue";
export default {
  components: { WeatherBlock },

  mounted() {},

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
