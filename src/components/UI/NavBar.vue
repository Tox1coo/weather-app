<template>
  <header class="header">
    <div class="header__inner">
      <form @submit.prevent="setCountry()" class="search">
        <MyInput
          v-model="country"
          v-model:visible-drop-list="visibleDropList"
        ></MyInput>
        <DropList
          v-if="country !== '' && visibleDropList"
          v-model:current-country="country"
          :countries="searchCountry()"
          v-model:visible-drop-list="visibleDropList"
        >
        </DropList>
      </form>
    </div>
  </header>
</template>

<script>
/* eslint-disable prettier/prettier */
import { mapState, mapMutations, mapGetters } from "vuex";
import MyInput from "./MyInput.vue";

export default {
  name: "NavBar",

  data() {
    return {
      country: "",
      visibleDropList: false,
    };
  },

  methods: {
    ...mapMutations({
      setCurrentCountry: "weather/setCurrentCountry",
    }),
    ...mapGetters({
      searchCountry: "weather/searchCountry",
    }),

	 setCountry() {
		this.visibleDropList = false;

	 }
  },
  computed: {
    ...mapState({
      allCityList: (state) => state.weather.allCityList,
      WEATHER_API: (state) => state.weather.WEATHER_API,
      currentCountry: (state) => state.weather.currentCountry,
    }),
  },

  watch: {
    country(setCountry) {
      this.setCurrentCountry(setCountry);
    },


  },

  components: { MyInput },
};
</script>

<style scoped lang="scss">
</style>