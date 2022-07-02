/* eslint-disable no-unused-vars */

import axios from "axios";

export const weather = {
	state: () => {
		return {
			WEATHER_API: '5335145300994666ae6125040220107',
			BASE_URL: 'http://api.weatherapi.com/v1/',
			weatherInfo: null,
			currentWeather: null
		};
	},

	mutations: {
		updateWeatherInfo(state, weatherInfo) {
			state.weatherInfo = weatherInfo;
		},
		updateCurrentWeather(state, currentWeather) {
			state.currentWeather = currentWeather;
		}
	},

	actions: {
		async getWeatherInfo({ commit, state }, userInfo) {
			await axios({
				method: 'get',
				url: `${state.BASE_URL}forecast.json?key=${state.WEATHER_API}&q=${userInfo.infoUser.city}&days=5&aqi=no&alerts=no`
			}).then((response) => {
				commit('updateCurrentWeather', response.data.current)
				commit('updateWeatherInfo', response.data)
			})
		},
		async getWeather({ commit, state }, city) {
			await axios({
				method: 'get',
				url: `${state.BASE_URL}forecast.json?key=${state.WEATHER_API}&q=${city.city}&days=5&aqi=no&alerts=no`
			}).then((response) => {
				commit('updateCurrentWeather', response.data.current)
				commit('updateWeatherInfo', response.data)
			})
		}
	},

	namespaced: true,
};
