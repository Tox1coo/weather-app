/* eslint-disable no-unused-vars */
/* eslint-disable prettier/prettier */
import axios from 'axios'
export const weather = {
	state: () => {
		return {
			WEATHER_API: '5335145300994666ae6125040220107',
			allCountryList: [],
			allCityList: [],
			allListCountryAndCity: null,
			searchItem: ''
		};
	},
	mutations: {
		updateCountryList(state, countryList) {
			for (const key in countryList) {
				if (key === '') {
					delete countryList[key]
				} else {
					state.allCountryList.push(key)
				}

			}
		},

		updateAllListCountryAndCity(state, allListCountryAndCity) {
			state.allListCountryAndCity = allListCountryAndCity
		},

		updateCityList(state, cityList) {
			for (const key in state.allListCountryAndCity) {
				if (cityList === key) {
					state.allCityList = state.allListCountryAndCity[key]
				}
			}
		},
		setCurrentSearchItem(state, searchItem) {
			state.searchItem = searchItem;
		},
	},

	getters: {
		searchCountry(state) {
			return [...state.allCountryList].filter(listItem => listItem.toLowerCase().includes(state.searchItem.toLowerCase()));
		},

		searchCity(state) {
			return [...state.allCityList].filter(listItem => listItem.toLowerCase().includes(state.searchItem.toLowerCase()));
		}
	},


	actions: {
		async getAllCountryList({ commit }) {

			await axios({
				method: 'get',
				url: 'https://raw.githubusercontent.com/David-Haim/CountriesToCitiesJSON/master/countriesToCities.json',
			}).then((response) => {
				commit('updateAllListCountryAndCity', response.data)
				commit('updateCountryList', response.data);
			})
		}
	},

	namespaced: true
}