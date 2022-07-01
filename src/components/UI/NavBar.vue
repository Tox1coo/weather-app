<template>
  <header class="header">
    <div class="header__inner">
		<FormList :list="searchCountry()"></FormList>
		<FormList :list="searchCity()"></FormList>
    </div>
  </header>
</template>

<script>
/* eslint-disable prettier/prettier */
import {mapState,mapGetters} from 'vuex'
export default {
  name: "NavBar",

	methods: {
		...mapGetters({
			searchCountry: "weather/searchCountry",
			searchCity: "weather/searchCity",
		}),

	},
  computed: {
	...mapState({
      allCountryList: (state) => state.weather.allCountryList,
	})

  }
};
</script>

<style scoped lang="scss">

.header {
	&__inner {
		display: flex;
	}
}
</style>