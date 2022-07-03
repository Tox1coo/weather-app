<template>
  <div class="forecast">
    <div class="forecast__inner">
      <div
        class="forecast__current"
        v-for="(weaterTime, index) in weatherForecastBlock?.forecastday"
        :key="index"
      >
        <div class="date">
          {{ new Date(weaterTime.date).getUTCDate() }}
          {{ arrMonths[new Date(weaterTime.date).getMonth()] }},
          {{ arrDay[new Date(weaterTime.date).getDay()] }}
        </div>

        <img
          class="forecast__current-img"
          :src="
            require(`@/assets/weather/day/${weaterTime?.day.condition.text}.png`)
          "
          alt=""
        />
        <div class="forecast__current-info">
          <p class="forecast__current-temp">
            {{ Math.round(weaterTime?.day.maxtemp_c) }} °C
          </p>
          <p class="forecast__current-title">
            {{ weaterTime.day?.condition.text }}
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  props: {
    weatherForecastBlock: { type: [Object, Array] },
    arrDay: { type: Array },
    arrMonths: { type: Array },
  },
};
</script>

<style scoped lang="scss">
.forecast {
  &__inner {
    width: 800px;
    height: 300px;
    border: 1px solid rgba(#1ce3cf, 0.8);
    border-radius: 8px;
    background-color: rgba(transparent, 0.1);
    backdrop-filter: blur(5px);
    align-self: flex-end;
    display: flex;
    gap: 15px;
    justify-content: space-evenly;
  }
  &__current {
    width: calc((800px / 3) - 20px);
    color: #1ce3cf;
    display: flex;
    flex-direction: column;
    align-items: center;

    &-temp {
      @extend .date;
      text-align: center;
      margin-top: 15px !important;
      margin-bottom: 15px !important;
      margin-left: 0 !important;
    }

    &-title {
      @extend .forecast__current-temp;
    }

    &-img {
      margin-top: 15px;
    }
  }
  .date {
    font-family: "Roboto";
    font-size: 22px;
    color: #5c92ff;
    margin-left: 10px;
    margin-top: 10px;
    font-style: oblique;
    font-weight: 700;
    align-self: flex-start;
  }
}
</style>