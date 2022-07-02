/* eslint-disable no-unused-vars */
/* eslint-disable prettier/prettier */
import axios from 'axios'
export const dbCountry = {
	state: () => {
		return {
			allCountryList: [],
			allCityList: [],
			allListCountryAndCity: null,
			searchItem: '',
			country: null,
			city: null

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

		setCurrentCountry(state, country) {
			state.allCityList = [];
			state.city = '';
			state.country = [...state.allCountryList].filter(listItem => listItem.toLowerCase().includes(country.toLowerCase()))[0];
		},

		setCurrentCity(state, city) {
			state.city = [...state.allCityList].filter(listItem => listItem.toLowerCase().includes(city.toLowerCase()))[0];
		},

		updateAllListCountryAndCity(state, allListCountryAndCity) {
			state.allListCountryAndCity = allListCountryAndCity
		},

		updateCityList(state, cityList) {
			for (const key in state.allListCountryAndCity) {
				if (cityList.toLowerCase() === key.toLocaleLowerCase()) {
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