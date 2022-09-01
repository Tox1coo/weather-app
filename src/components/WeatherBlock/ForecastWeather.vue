<template>
  <div class="forecastlist">
    <button
      :disabled="currentDay === 0"
      :class="{
        'arrow-active': currentDay > 0,
        'arrow-disabled': currentDay === 0,
      }"
      @click="prevDayTime()"
      class="arrow-prev"
    >
      {{ visibleSlide - 1 }}
      <img :src="require('@/assets/left-arrow.png')" alt="" />
    </button>
    <button
      :disabled="currentDay === Math.floor(forecastInfo?.length / visibleSlide)"
      :class="{
        'arrow-active': currentDay < forecastInfo?.length / visibleSlide,
        'arrow-disabled':
          currentDay === Math.floor(forecastInfo?.length / visibleSlide),
      }"
      @click="nextDayTime()"
      class="arrow-next"
    >
      <img :src="require('@/assets/right-arrow.png')" alt="" />
    </button>
    <div class="forecastlist__inner">
      <ForecastWeatherItem
        v-for="forecastInfoItem in forecastInfo"
        :key="forecastInfoItem.date"
        :timeStamp="timestamp"
        :forecastDay="forecastInfoItem.hour"
        :arrDay="arrDay"
        :arrMonths="arrMonths"
        :day="forecastInfoItem.date"
        :currentDay="currentDay"
      ></ForecastWeatherItem>
    </div>
  </div>
</template>

<script>
import ForecastWeatherItem from "@/components/WeatherBlock/ForecastWeatherItem.vue";
export default {
  data() {
    return {
      timestamp: {
        утро: [6, 7, 8, 9, 10, 11],
        день: [12, 13, 14, 15, 16, 17],
        вечер: [18, 19, 20, 21, 22, 23],
        ночь: [0, 1, 2, 3, 4, 5],
      },
      currentDay: 0,
      visibleSlide: 2,
      widthDocument: 0,
    };
  },

  props: {
    forecastInfo: { type: [Array, Object] },
    arrDay: { type: Array },
    arrMonths: { type: Array },
  },
  components: { ForecastWeatherItem },
  methods: {
    nextDayTime() {
      const maxSlides = Math.floor(
        this.forecastInfo?.length / this.visibleSlide
      );
      if (this.currentDay < maxSlides) this.currentDay += 1;
    },

    prevDayTime() {
      if (this.currentDay > 0) this.currentDay -= 1;
    },
  },

  /*   mounted() {
    setInterval(() => {
      this.widthDocument = document.body.offsetWidth;
    }, 1000);
  }, */
  /*   watch: {
    widthDocument(width) {
      if (width <= 1440) {
        this.visibleSlide = 1.5;
      } else {
        this.visibleSlide = 2;
        this.currentDay = 0;
      }
    },
  }, */
};
</script>

<style lang="scss" scoped>
.forecastlist {
  position: relative;
  &__inner {
    overflow: hidden;

    width: 1345px;
    height: 460px;
    margin-top: 50px;
    margin-right: 20px;
    border-radius: 8px;
    background-color: rgba(transparent, 0.1);
    backdrop-filter: blur(5px);
    border: 1px solid rgba(#1ce3cf, 0.8);
    display: flex;
    @media (max-width: 1440px) {
      width: 680px;
      align-self: flex-start;
    }
    @media (min-width: 1024px) {
      margin-right: 0px;
    }
  }
}
.arrow-prev {
  position: absolute;
  width: 28px;
  height: 28px;
  border-radius: 50px;
  background-color: rgba(#000, 0.1);
  backdrop-filter: blur(5px);
  left: 45%;
  top: -40px;
  transform: translateX(-50%);
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
  left: 55%;
  transform: translateX(-50%);
}

.arrow-active {
  opacity: 1;
}

.arrow-disabled {
  opacity: 0.3;
}
</style>