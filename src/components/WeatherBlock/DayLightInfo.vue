<template>
  <div class="daylight">
    <div class="daylight__inner">
      <div class="daylight__inner-photo">
        <img :src="require('@/assets/earth.svg')" class="earth" />
        <img :src="require('@/assets/moon-traec.svg')" class="moontraec" />
        <img :src="require('@/assets/moon.svg')" class="moon" />
        <img :src="require('@/assets/daylight.svg')" class="daylighttraec" />
      </div>
      <div class="daylight__text">
        <span>Dayligt</span>
        <span :style="'position: relative; z-index:1000;'" id="time">{{
          getMergeDateTime
        }}</span>
      </div>
      <div class="daylight__time">
        <span>{{ dayLightInfo?.sunrise }}</span>
        <span>{{ dayLightInfo?.sunset }}</span>
      </div>
      <div class="sun"></div>
      <div class="daylight__title">
        <span>Phase Moon</span>

        <span id="phase">{{ dayLightInfo?.moon_phase }}</span>
      </div>
    </div>
  </div>
</template>

<script>
/* eslint-disable no-unused-vars */

import moment from "moment";
export default {
  props: {
    dayLightInfo: { type: Object },
  },
  computed: {
    getMergeDateTime() {
      const parsedTimeSunrise = moment(this.dayLightInfo?.sunrise, [
        "h:mm A",
      ]).format("HH:mm");
      const parsedTimeSunset = moment(this.dayLightInfo?.sunset, [
        "h:mm A",
      ]).format("HH:mm");
      const hourSunrise = parsedTimeSunrise.match(/\b\d\d\b/);
      const minuteSunrise = parsedTimeSunrise
        .match(/\b:\d\d\b/)
        ?.toString()
        .replace(/:/g, "");
      const hourSunset = parsedTimeSunset.match(/\b\d\d\b/);
      const minuteSunset = parsedTimeSunset
        .match(/\b:\d\d\b/)
        ?.toString()
        .replace(/:/g, "");
      let hourDayLight = hourSunset - hourSunrise;
      let minuteDayLight = minuteSunset - minuteSunrise;
      if (minuteDayLight <= 0) {
        minuteDayLight = 60 + minuteDayLight;
        hourDayLight--;
      }

      return `${hourDayLight}h ${minuteDayLight}min`;
    },
  },
};
</script>

<style scoped lang="scss">
.daylight {
  margin-left: 50px;
  @media (max-width: 1440px) {
    order: 1;
  }
  &__inner {
    width: 500px;
    height: 300px;
    border: 1px solid rgba(#1ce3cf, 0.8);
    border-radius: 8px;
    background-color: rgba(transparent, 0.1);
    backdrop-filter: blur(5px);
    gap: 15px;
    justify-content: space-evenly;
    position: relative;
    overflow: hidden;
  }

  &__text {
    color: #56dde4;
    font-family: "Roboto";
    font-size: 25px;
    font-style: oblique;
    position: absolute;
    top: 20px;
    left: 50%;
    transform: translateX(-50%);
    span {
      display: block;
      text-align: center;
    }
    & #time {
      font-weight: 700;
    }
  }

  &__time {
    color: #56dde4;
    font-family: "Roboto";
    font-size: 16px;
    width: 310px;
    display: flex;
    justify-content: space-between;
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    top: 55%;
    font-style: oblique;
  }

  &__title {
    @extend .daylight__text;
    top: 75%;

    & #phase {
      font-weight: 700;
    }
  }
}

.sun {
  width: 200px;
  height: 200px;
  background-color: yellow;
  border-radius: 50%;
  position: absolute;
  right: -70px;
  top: -100px;

  &::after {
    content: "";
    display: block;
    width: 250px;
    height: 250px;
    position: absolute;
    top: -20px;
    right: -20px;
    z-index: -1;
    background-color: #fdfdb3;
    opacity: 0.5;
    border-radius: 50%;
  }
}
.earth {
  position: absolute;
  top: 50%;
  left: 50%;
  z-index: 1;
  transform: translate(-50%, -50%);
}

.moontraec {
  @extend .earth;
}
.daylighttraec {
  @extend .earth;
  top: 35%;
}

.moon {
  @extend .earth;
  top: 60%;
  left: 38%;
}
</style>