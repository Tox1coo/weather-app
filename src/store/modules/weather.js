/* eslint-disable no-unused-vars */
/* eslint-disable prettier/prettier */
import axios from 'axios'
export const weather = {
	state: () => {
		return {
			WEATHER_API: '5335145300994666ae6125040220107',
			allCityList: [],
			currentCountry: 'a'
		};
	},
	mutations: {
		updateCityList(state, cityList) {
			for (const key in cityList) {
				if (key === '') {
					delete cityList[key]
				} else {
					state.allCityList.push(key)
				}

			}
		},

		setCurrentCountry(state, currentCountry) {
			state.currentCountry = currentCountry;
		},
	},

	getters: {
		searchCountry(state, getters) {
			return [...state.allCityList].filter(country => country.toLowerCase().includes(state.currentCountry.toLowerCase()));
		},
	},
	actions: {
		async getAllCityList({ commit }) {

			await axios({
				method: 'get',
				url: 'https://raw.githubusercontent.com/David-Haim/CountriesToCitiesJSON/master/countriesToCities.json',
			}).then((response) => {
				commit('updateCityList', response.data);
				console.log(response.data);
			})
		}
	},

	namespaced: true
}