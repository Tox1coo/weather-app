<template>
  <header class="header">
    <div class="header__inner">
		<FormList v-if="!checkFormCountry" v-model:checkForm="checkFormCountry" :list="searchCountry()" :data-type="'country'"></FormList>
		<InfoBlock v-else-if="checkFormCountry" v-model:checkForm="checkFormCountry" v-model:visibleInfoBlock="checkFormCountry" :itemBlock="country" :typeBlock="'Страна: '" ></InfoBlock>
		<FormList v-if="!checkFormCity || city === ''" v-model:checkForm="checkFormCity"  :list="searchCity()" :data-type="'city'"></FormList>
		<InfoBlock v-else-if="checkFormCity" v-model:checkForm="checkFormCity" v-model:visibleInfoBlock="checkFormCity" :itemBlock="city" :typeBlock="'Город: '" ></InfoBlock>
    </div>
  </header>
</template>

<script>
/* eslint-disable prettier/prettier */
import {mapState,mapGetters, mapMutations} from 'vuex'
export default {
  name: "NavBar",
	data() {
		return {
			checkFormCountry: false,
			checkFormCity: false,
			itemBlock: '',
		}
	},
	methods: {
		...mapGetters({
			searchCountry: "weather/searchCountry",
			searchCity: "weather/searchCity",
		}),
		...mapMutations({
			setCurrentCountry: "weather/setCurrentCountry",
			setCurrentCity: "weather/setCurrentCity",

		}),

	},
  computed: {
	...mapState({
      allCountryList: (state) => state.weather.allCountryList,
		country: (state) => state.weather.country,
		city: (state) => state.weather.city
	})

  }
};
</script>

<style scoped lang="scss">

.header {
	&__inner {
		display: flex;
		gap:	20px;
		justify-content: center;
		align-items: center;
		margin-top: 5px;
	}
}
</style>