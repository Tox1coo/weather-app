<template>
  <div class="weather">
    <div class="weather__inner">
      <div class="weather__inner-left">
        <div class="weather__inner-left-top">
          <ForecastWeather
            :forecastInfo="weatherInfo.forecast.forecastday"
            :arrDay="arrDay"
            :arrMonths="arrMonth"
          ></ForecastWeather>
        </div>
        <div class="weather__inner-left-bottom">
          <DayLightInfo
            v-if="!rotateDayLight"
            :dayLightInfo="weatherInfo.forecast.forecastday[0].astro"
          ></DayLightInfo>
          <WeatherForecastBlock
            :weatherForecastBlock="weatherInfo?.forecast"
            :arrDay="arrDay"
            :arrMonths="arrMonth"
          ></WeatherForecastBlock>
        </div>
      </div>
      <div class="weather__inner-right-current">
        <div class="weather__inner-right">
          <div class="date">
            {{ getDate }}
          </div>

          <WeatherCurrent
            @prevSlide="prevDayTime"
            @nextSlide="nextDayTime"
            :weatherInfo="weatherInfo"
            :currentSlide="currentSlide"
            :currentWeather="currentWeather"
          >
          </WeatherCurrent>
        </div>
        <DayLightInfo
          v-if="rotateDayLight"
          :dayLightInfo="weatherInfo?.forecast.forecastday[0].astro"
        ></DayLightInfo>
      </div>
    </div>
  </div>
</template>

<script>
/* eslint-disable no-unused-vars */
import WeatherForecastBlock from "@/components/WeatherBlock/WeatherForecastBlock.vue";
import DayLightInfo from "@/components/WeatherBlock/DayLightInfo.vue";
import ForecastWeather from "@/components/WeatherBlock/ForecastWeather.vue";
import WeatherCurrent from "@/components/WeatherBlock/WeatherCurrent.vue";

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
      currentSlide: 0,
      widthDocument: 0,
      rotateDayLight: false,
    };
  },
  components: {
    WeatherForecastBlock,
    DayLightInfo,
    ForecastWeather,
    WeatherCurrent,
  },
  methods: {
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
    getMonth() {
      return new Date().getMonth();
    },
    getDay() {
      return new Date().getDay();
    },
    getDate() {
      return `${new Date(
        this.weatherInfo?.forecast.forecastday[0].date
      ).getUTCDate()}
             ${this.arrMonth[this.getMonth]} ,  ${this.arrDay[this.getDay]}
             ${this.currentWeather?.last_updated
               .match(/\b\d\d:\d\d\b/)
               .toString()}`;
    },
  },
  mounted() {
    // this.widthDocument = document.body.offsetWidth;
  },
  /*   watch: {
    widthDocument(width) {
      if (width <= 1440) {
        this.rotateDayLight = true;
      } else {
        this.rotateDayLight = false;
      }
    },
  }, */
};
</script>

<style scoped lang="scss">
.weather {
  margin: 20px auto 25px;
  position: relative;
  z-index: 1;
  width: 1850px;
  height: 880px;
  @media (max-width: 1440px) {
    height: fit-content;
    width: 1350px;
  }
  border: 1px solid rgba($color: #1ce3cf, $alpha: 0.5);
  border-radius: 8px;
  &__inner {
    display: flex;
    justify-content: space-around;
    height: 880px;
    align-items: center;
    @media (max-width: 1440px) {
      height: fit-content;
      align-items: stretch;
    }
    @media (min-width: 1024px) {
      justify-content: center;
    }
    &-left {
      width: 100%;
      display: flex;
      flex-direction: column;
      gap: 15px;

      @media (max-width: 1440px) {
        width: 55%;
        justify-content: space-between;
        align-items: center;
      }

      &-top {
        align-self: flex-end;

        @media (max-width: 1440px) {
          align-self: flex-start;
          margin-left: 12px;
          margin-top: 20px;
        }
        @media (min-width: 1024px) {
          margin-left: 0px;
          align-self: center;
        }
      }
      &-bottom {
        width: 100%;
        margin-right: 20px;
        display: flex;
        align-self: flex-end;
        justify-content: space-between;
        margin-bottom: 50px;

        @media (max-width: 1440px) {
          flex-direction: column;
          align-items: center;
          margin-bottom: 20px;
        }
        @media (min-width: 1024px) and (max-width: 1440px) {
          margin-right: 0px;
        }
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
      @media (max-width: 1440px) {
        margin-right: 0;
      }
      &-current {
        display: flex;
        flex-direction: column;
        align-items: center;

        @media (max-width: 1440px) {
          margin-top: 20px;
          margin-bottom: 20px;
        }
        & .daylight {
          margin-left: 0;
          margin-top: 10px;
        }
      }
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
