<template>
  <div class="weather">
    <div class="weather__inner">
      <div class="weather__inner-left"></div>
      <div class="weather__inner-right">
        <div class="date">
          {{ numericDay }} {{ arrMonth[month] }}, {{ arrDay[day] }}
        </div>
        <div class="weather__current">
<!--           <img
            class="weather__current-img"
            :src="currentWeather?.condition.icon"
            alt=""
          /> -->

				<img
				v-if="currentWeather?.is_day === 0"
            class="weather__current-img"
            :src="require(`@/assets/weather/night/${currentWeather?.condition.text}.png`)"
            alt=""
          />
			<img
				v-else-if="currentWeather?.is_day === 1"
            class="weather__current-img"
            :src="require(`@/assets/weather/day/${currentWeather?.condition.text}.png`)"
            alt=""
          />
          <div class="weather__current-info">
            <p class="weather__current-temp">
              {{ Math.round(currentWeather?.temp_c) }} °C
            </p>
				<p class="weather__current-temp--feelslike">
              Ощущается как {{ Math.round(currentWeather?.feelslike_c) }} °C
            </p>
            <p class="weather__current-title">
              {{ currentWeather?.condition.text }}
            </p>
          </div>
			 <div class="weather__current-info weather__current-info--bottom">
            <div class="weather__current-wind">
					<img :src="require('@/assets/weather/wind.png')" alt="wind">
					<span>Wind | {{currentWeather?.wind_kph}} km/h |</span>
					<img :src="require('@/assets/weather/compass.png')" alt="compass">
					<span>{{currentWeather?.wind_dir}}</span>
            </div>

            <div class="weather__current-humidity">
					<img :src="require('@/assets/weather/humidity.png')" alt="humidity">
					<span>Hum | {{currentWeather?.humidity}} %</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
/* eslint-disable no-unused-vars */

import { mapState } from "vuex";
export default {
  data() {
    return {
      arrDay: [
        "Sunday",
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
      ],
      day: new Date().getDay(),
      arrMonth: [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December",
      ],
      month: new Date().getMonth(),
      numericDay: new Date().getUTCDate(),
    };
  },

  computed: {
    ...mapState({
      weatherInfo: (state) => state.weather.weatherInfo,
      currentWeather: (state) => state.weather.currentWeather,
    }),
  },
};
</script>

<style scoped lang="scss">
.weather {
  margin: 25px auto 25px;
  position: relative;
  z-index: 1;
  width: 1800px;
  height: 880px;
  border: 1px solid rgba($color: #1ce3cf, $alpha: 0.5);
  border-radius: 8px;
  &__inner {
    display: flex;
    justify-content: space-between;
    height: 880px;
    align-items: center;
    &-right {
      display: flex;
      flex-direction: column;
      width: 400px;
      height: 780px;
      border: 1px solid rgba($color: #1ce3cf, $alpha: 0.5);
      border-radius: 8px;
      background-color: rgba(transparent, 0.1);
      backdrop-filter: blur(5px);
      margin-right: 50px;
    }
  }
  &__current {
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
	 gap: 40px;
    margin-top: 50px;
    &-img {
      width: 200px;
      height: 200px;
    }

	 &-info {
		display: flex;
		flex-direction: column;
		align-items: center;

		&--bottom {
			margin-top: 25px;
		}
	 }

    &-title {
      @extend .date;
      margin-top: 25px !important;
      margin-bottom: 0;
      margin-left: 0;
    }
    &-temp {
      @extend .date;
      margin: 0 !important;
      font-size: 50px !important;

		&--feelslike {
			@extend .date;
			font-size: 20px !important;
			margin-bottom: 0;
			margin-left: 0;
		}
    }

	 &-wind {
		display: flex;
		align-items: center;
		gap: 5px;
		color: #5c92ff;
		font-size: 25px;
	 }

	 &-humidity {
		@extend .weather__current-wind;
		display: flex;
		align-items: flex-start;
		gap: 10px;
		width: 100%;
		margin-top: 10px;
	 }
  }
  background-color: rgba(transparent, 0.2);
  backdrop-filter: blur(5px);
}

.date {
  font-family: "Roboto";
  font-size: 25px;
  color: #5c92ff;
  margin-left: 10px;
  margin-top: 10px;
  font-style: oblique;
  font-weight: 700;
}
</style>
направление ветра
скорость ветра
влажность
