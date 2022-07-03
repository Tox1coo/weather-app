<template>
  <div class="weather">
    <div class="weather__inner">
      <div class="weather__inner-left">
        <div class="weather__inner-left-top">
          <ForecastWeather
            :forecastInfo="weatherInfo?.forecast.forecastday"
            :arrDay="arrDay"
            :arrMonths="arrMonth"
          ></ForecastWeather>
        </div>
        <div class="weather__inner-left-bottom">
          <DayLightInfo
            :dayLightInfo="weatherInfo?.forecast.forecastday[0].astro"
          ></DayLightInfo>
          <WeatherForecastBlock
            :weatherForecastBlock="weatherInfo?.forecast"
            :arrDay="arrDay"
            :arrMonths="arrMonth"
          ></WeatherForecastBlock>
        </div>
      </div>
      <div class="weather__inner-right">
        <div class="date">
          {{ new Date(weatherInfo?.forecast.forecastday[0].date).getUTCDate() }}
          {{ arrMonth[month] }}, {{ arrDay[day] }}
          {{ currentWeather?.last_updated.match(/\b\d\d:\d\d\b/).toString() }}
        </div>
        <div class="weather__current">
          <img
            v-if="currentWeather?.is_day === 0"
            class="weather__current-img"
            :src="
              require(`@/assets/weather/night/${currentWeather?.condition.text}.png`)
            "
            alt=""
          />
          <img
            v-else-if="currentWeather?.is_day === 1"
            class="weather__current-img"
            :src="
              require(`@/assets/weather/day/${currentWeather?.condition.text}.png`)
            "
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
              <img :src="require('@/assets/weather/wind.png')" alt="wind" />
              <span>Wind | {{ currentWeather?.wind_kph }} km/h |</span>
              <img
                :src="require('@/assets/weather/compass.png')"
                alt="compass"
              />
              <span>{{ currentWeather?.wind_dir }}</span>
            </div>
            <div class="weather__current-humidity">
              <img
                :src="require('@/assets/weather/humidity.png')"
                alt="humidity"
              />
              <span>Hum | {{ currentWeather?.humidity }} %</span>
            </div>
          </div>
          <div class="weather__current-info weather__current-info--time">
            <button
              :disabled="currentSlide === 0"
              :class="{
                'arrow-active': currentSlide > 0,
                'arrow-disabled': currentSlide === 0,
              }"
              @click="prevDayTime()"
              class="arrow-prev"
            >
              <img :src="require('@/assets/left-arrow.png')" alt="" />
            </button>
            <div class="weather__current-wrapper">
              <div
                ref="currentTime"
                class="weather__current-time"
                v-for="(weaterTime, index) in weatherInfo?.forecast
                  .forecastday[0].hour"
                :key="index"
                :style="{
                  left: `${-84 * currentSlide}px`,
                }"
              >
                <span>{{
                  weaterTime.time.match(/\b\d\d:\d\d\b/).toString()
                }}</span>
                <img
                  class="weather__current-img weather__current-img--time"
                  v-if="weaterTime.is_day == 0"
                  :src="
                    require(`@/assets/weather/night/${weaterTime.condition.text}.png`)
                  "
                  :alt="weaterTime.condition.text"
                />
                <img
                  class="weather__current-img weather__current-img--time"
                  v-else-if="weaterTime.is_day == 1"
                  :src="
                    require(`@/assets/weather/day/${weaterTime.condition.text}.png`)
                  "
                  :alt="weaterTime.condition.text"
                />
                <span>{{ Math.round(weaterTime.temp_c) }} °C</span>
              </div>
            </div>
            <button
              :disabled="currentSlide === 20"
              :class="{
                'arrow-active': currentSlide < 20,
                'arrow-disabled': currentSlide === 20,
              }"
              @click="nextDayTime()"
              class="arrow-next"
            >
              <img :src="require('@/assets/right-arrow.png')" alt="" />
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
/* eslint-disable no-unused-vars */
import WeatherForecastBlock from "@/components/WeatherBlock/WeatherForecastBlock.vue";
import DayLightInfo from "@/components/WeatherBlock/DayLightInfo.vue";
import ForecastWeather from "@/components/WeatherBlock/ForecastWeather.vue";

import { mapActions, mapState } from "vuex";
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
      currentSlide: 0,
    };
  },
  components: { WeatherForecastBlock, DayLightInfo, ForecastWeather },
  methods: {
    ...mapActions({
      getWeatherInfo: "weather/getWeatherInfo",
    }),

    nextDayTime() {
      const maxSlides = 20;
      if (this.currentSlide < maxSlides) this.currentSlide += 2;
    },

    prevDayTime() {
      if (this.currentSlide > 0) this.currentSlide -= 2;
    },
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
  margin: 20px auto 25px;
  position: relative;
  z-index: 1;
  width: 1850px;
  height: 880px;
  border: 1px solid rgba($color: #1ce3cf, $alpha: 0.5);
  border-radius: 8px;
  &__inner {
    display: flex;
    height: 880px;
    align-items: center;

    &-left {
      width: 100%;
      display: flex;
      flex-direction: column;
      gap: 15px;
      &-top {
        align-self: flex-end;
      }
      &-bottom {
        width: 100%;
        margin-right: 20px;
        display: flex;
        align-self: flex-end;
        justify-content: space-between;
        margin-bottom: 50px;
      }
    }
    &-right {
      display: flex;
      flex-direction: column;
      min-width: 400px;
      max-width: 400px;

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
    gap: 20px;
    margin-top: 50px;
    &-img {
      width: 200px;
      height: 200px;

      &--time {
        width: 64px;
        height: 64px;
      }
    }

    &-time {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      gap: 5px;
      color: #5c92ff;
      position: relative;
      transition: all 0.3s ease 0s;
    }

    &-wrapper {
      display: flex;
      gap: 20px;
      overflow: hidden;
    }
    &-info {
      display: flex;
      flex-direction: column;
      align-items: center;

      &--bottom {
        margin-top: 25px;
      }

      &--time {
        max-width: 320px;
        display: flex;
        flex-direction: row;
        align-items: center;
        position: relative;
        margin-top: 20px;
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
.arrow-prev {
  position: absolute;
  width: 28px;
  height: 28px;
  border-radius: 50px;
  background-color: rgba(#000, 0.1);
  backdrop-filter: blur(5px);
  left: -32px;
  border: 1px solid rgba(#1ce3cf, 0.8);
  transition: opacity 0.1s linear;
  cursor: pointer;
  img {
    position: absolute;
    top: 50%;
    left: 50%;
    z-index: 1;
    transform: translate(-50%, -50%);
  }
}

.arrow-next {
  @extend .arrow-prev;
  right: 0 !important;
  left: 101%;
}

.arrow-active {
  opacity: 1;
}

.arrow-disabled {
  opacity: 0.3;
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
