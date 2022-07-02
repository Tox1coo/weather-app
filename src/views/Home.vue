<template>
  <NavBar :check="check"></NavBar>
  <WeatherBlock></WeatherBlock>
</template>

<script>
/* eslint-disable no-unused-vars */

import { mapActions, mapMutations, mapState } from "vuex";
import WeatherBlock from "@/components/WeatherBlock/WeatherBlock.vue";
import axios from 'axios';
export default {
  data() {
    return {
      infoUser: {
        country: '',
        city: '',
      },
      check: false,
    };
  },
  components: { WeatherBlock },

  async mounted() {
    await this.getInfoUser()
  },

  methods: {
    ...mapMutations({
      setCurrentCity: "dbCountry/setCurrentCity",
      setCurrentCountry: "dbCountry/setCurrentCountry",
      updateCityList: 'dbCountry/updateCityList'

    }),
    async getInfoUser() {

      await axios({
        method:'get',
        url:'http://api.sypexgeo.net/json'
      }).then((response) => {
          this.infoUser.city = response.data.city.name_en;
          this.infoUser.country = response.data.country.name_en;
      }).finally( async () => {
          setTimeout(() => {
            this.setCurrentCountry(this.infoUser.country);
            this.updateCityList(this.infoUser.country)
          },400)
          setTimeout(() => {
            this.setCurrentCity(this.infoUser.city);
          },500)
          this.check = true
          this.getWeatherInfo(this.infoUser);
      })
    }
  },

  computed: {
    ...mapActions({
      getWeatherInfo: "weather/getWeatherInfo",
    }),

  },
};
</script>
