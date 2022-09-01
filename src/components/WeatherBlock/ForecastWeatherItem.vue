<template>
  <div :style="{ left: `${-680 * currentDay}px` }" class="forecastitem">
    <div class="forecastitem__inner">
      <div class="date">
        {{ new Date(day).getUTCDate() }}
        {{ arrMonths[new Date(day).getMonth()] }},
        {{ arrDay[new Date(day).getDay()] }}
        <!-- Переписать на геттерс -->
      </div>
      <div class="forecastitem__timestamp">
        <div
          v-for="(timeStampItem, key) in timeStamp"
          :key="key"
          class="forecastitem__timestamp-item"
        >
          {{ key }}
          <img
            v-if="key !== 'ночь' && avegargeTempTimeStamp[key]?.condition != ''"
            :src="
              require(`@/assets/weather/day/${avegargeTempTimeStamp[key]?.condition}.png`)
            "
            :alt="avegargeTempTimeStamp[key]?.condition"
            class="forecastitem__timestamp-img"
          />
          <img
            v-else-if="
              key === 'ночь' && avegargeTempTimeStamp[key]?.condition != ''
            "
            :src="
              require(`@/assets/weather/night/${avegargeTempTimeStamp[key]?.condition}.png`)
            "
            :alt="avegargeTempTimeStamp[key]?.condition"
            class="forecastitem__timestamp-img"
          />
          <div class="forecastitem__timestamp-infotemp">
            <p class="forecastitem__timestamp-temp">
              {{ avegargeTempTimeStamp[key].temp }} °C
            </p>
            <p class="forecastitem__timestamp-title">
              {{ avegargeTempTimeStamp[key].condition }}
            </p>
          </div>
          <div class="forecastitem__timestamp-info">
            <div class="forecastitem__timestamp-info-typeinfo">
              <img :src="require('@/assets/weather/wind.png')" alt="wind" />
              <span>Wind | {{ avegargeTempTimeStamp[key].wind }} km/h</span>
            </div>
            <div class="forecastitem__timestamp-info-typeinfo">
              <img
                :src="require('@/assets/weather/compass.png')"
                alt="compass"
              />
              <span>{{ avegargeTempTimeStamp[key].wind_dir }}</span>
            </div>
            <div class="forecastitem__timestamp-info-typeinfo">
              <img
                :src="require('@/assets/weather/humidity.png')"
                alt="humidity"
              />
              <span>Hum | {{ avegargeTempTimeStamp[key].hum }} %</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      avegargeTempTimeStamp: {
        утро: {
          temp: 0,
          condition: "",
          wind: 0,
          wind_dir: "",
          hum: 0,
        },
        день: {
          temp: 0,
          condition: "",
          wind: 0,
          wind_dir: "",
          hum: 0,
        },
        вечер: {
          temp: 0,
          condition: "",
          wind: 0,
          wind_dir: "",
          hum: 0,
        },
        ночь: {
          temp: 0,
          condition: "",
          wind: 0,
          wind_dir: "",
          hum: 0,
        },
      },
      indexTimeStamp: 0,
      indexTimeStampCondition: 0,
    };
  },
  props: {
    timeStamp: { type: Object },
    forecastDay: { type: Array },
    arrDay: { type: Array },
    arrMonths: { type: Array },
    day: String,
    currentDay: { type: Number, default: 0 },
  },
  mounted() {
    this.getAverageTempInTimeStamp();
    this.getAverageConditionInTimeStamp();
  },
  methods: {
    getAverageTempInTimeStamp() {
      for (const key in this.timeStamp) {
        for (const keyAvg in this.avegargeTempTimeStamp) {
          if (key === keyAvg && this.indexTimeStamp <= 4) {
            this.indexTimeStamp++;
            this.getAverageTemp(
              this.timeStamp[key],
              key,
              this.avegargeTempTimeStamp,
              this.forecastDay,
              "temp",
              "temp_c"
            );
            this.getAverageTemp(
              this.timeStamp[key],
              key,
              this.avegargeTempTimeStamp,
              this.forecastDay,
              "hum",
              "humidity"
            );
            this.getAverageTemp(
              this.timeStamp[key],
              key,
              this.avegargeTempTimeStamp,
              this.forecastDay,
              "wind",
              "wind_kph"
            );
          }
        }
      }
    },
    getAverageTemp(array, key, obj, forecast, type, typeForecast) {
      array.forEach((timeZone, index) => {
        if (index < 5) {
          obj[key][type] += forecast[timeZone][typeForecast];
        } else {
          obj[key][type] += forecast[timeZone][typeForecast];
          obj[key][type] /= 6;
          obj[key][type] = Math.round(obj[key][type]);
        }
      });
    },

    getAverageConditionInTimeStamp() {
      for (const key in this.timeStamp) {
        for (const keyAvg in this.avegargeTempTimeStamp) {
          if (key === keyAvg && this.indexTimeStampCondition <= 4) {
            this.indexTimeStampCondition++;
            this.getAverageCondition(
              this.timeStamp[key],
              key,
              this.avegargeTempTimeStamp,
              this.forecastDay,
              "condition"
            );
            this.getAverageCondition(
              this.timeStamp[key],
              key,
              this.avegargeTempTimeStamp,
              this.forecastDay,
              "wind_dir"
            );
          }
        }
      }
    },

    async getAverageCondition(array, keyObj, obj, forecast, type) {
      const object = {};
      await array.forEach((timeZone, index) => {
        if (index < 6) {
          if (type === "condition") {
            if (
              !Object.hasOwnProperty.call(
                object,
                forecast[timeZone].condition.text
              )
            ) {
              object[forecast[timeZone].condition.text] = 1;
            } else {
              object[forecast[timeZone].condition.text]++;
            }
          } else if (type === "wind_dir") {
            if (
              !Object.hasOwnProperty.call(object, forecast[timeZone].wind_dir)
            ) {
              object[forecast[timeZone].wind_dir] = 1;
            } else {
              object[forecast[timeZone].wind_dir]++;
            }
          }
        }
      });
      const max = Math.max.apply(null, Object.values(object));
      for (const key in object) {
        if (object[key] === max) {
          obj[keyObj][type] = key;
        }
      }
    },
  },
};
</script>

<style scoped lang="scss">
.forecastitem {
  p {
    margin: 0;
  }
  transition: left 0.2s ease 0s;
  border-right: 1px solid rgba($color: #1ce3cf, $alpha: 0.8);
  display: flex;
  width: 100%;
  min-width: 680px;
  flex-direction: column;
  justify-content: center;
  position: relative;
  &:last-child {
    border: 0;
    padding-right: 0;
  }
  &__inner {
    width: 100%;
  }
  &__timestamp {
    display: flex;
    width: 100%;
    gap: 8px;
    &-item {
      color: #56dde4;
      display: flex;
      flex-direction: column;
      align-items: center;
      text-align: center;
      font-family: "Roboto";
      font-size: 20px;
      min-width: calc(680px / 4)-12px;
      max-width: calc(680px / 4)-12px;
      min-height: 277px;
    }
    &-infotemp {
      margin-top: 15px;
      margin-bottom: 15px;
      flex: 1 1 auto;
    }
    &-temp {
      font-size: 22px;
      margin-bottom: 5px !important;
    }
    &-info {
      text-align: start;
    }
    &-img {
      width: 50px;
      height: 50px;
      margin-top: 10px;
    }
    &-info {
      display: flex;
      flex-direction: column;
      gap: 7px;
      align-self: flex-end;
      &-typeinfo {
        display: flex;
        align-items: center;
      }
    }
  }
}
.date {
  font-family: "Roboto";
  font-size: 25px;
  color: #5c92ff;
  margin-left: 10px;
  margin-top: 10px;
  font-style: oblique;
  font-weight: 700;
  align-self: flex-start;
  position: absolute;
  left: 0;
  top: 0;
}
</style>