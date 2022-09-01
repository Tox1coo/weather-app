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
			city: null,
			isLoading: false
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

			state.country = state.allCountryList.filter(listItem => listItem.toLowerCase().includes(country.toLowerCase()))[0] || 'Russia';
		},

		setCurrentCity(state, city) {
			state.city = state.allCityList.filter(listItem => listItem.toLowerCase().includes(city.toLowerCase()))[0] || 'Moscow';
		},

		updateAllListCountryAndCity(state, allListCountryAndCity) {
			state.allListCountryAndCity = allListCountryAndCity
		},

		updateCityList(state, cityList) {
			for (const key in state.allListCountryAndCity) {

				if (cityList.toLowerCase() === key.toLowerCase()) {
					console.log(state.allListCountryAndCity[key]);

					state.allCityList = state.allListCountryAndCity[key]
				}
			}
		},

		setCurrentSearchItem(state, searchItem) {
			state.searchItem = searchItem;
		},

		updateIsLoading(state, isLoading) {
			state.isLoading = isLoading;
		}
	},

	getters: {
		searchCountry(state) {
			return state.allCountryList.filter(listItem => listItem.toLowerCase().includes(state.searchItem.toLowerCase()));
		},

		searchCity(state) {
			return state.allCityList.filter(listItem => listItem.toLowerCase().includes(state.searchItem.toLowerCase()));
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
		},
		getInfoUser({ commit, dispatch, state }) {
			axios({
				method: "get",
				url: "https://api.sypexgeo.net/json",
			}).then((response) => {
				const infoUser = {
					country: response.data.country.name_en,
					city: response.data.city.name_en
				}
				commit('setCurrentCountry', infoUser.country)
				commit('updateCityList', infoUser.country)
				commit('setCurrentCity', infoUser.city)


				dispatch('weather/getWeatherInfo', response.data.city.name_en, { root: true })
			})
		}
	},

	namespaced: true
}