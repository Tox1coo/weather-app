<template>
  <div ref="drop" class="drop">
    <p
      class="drop__item"
      :value="country"
      v-for="(country,index) in list"
      :key="index"
      @click="setSearchList(country)"
    >
      {{ country }}
    </p>
  </div>
</template>

<script>
/* eslint-disable prettier/prettier */
import {mapMutations, mapState} from 'vuex'
export default {
  name: "DropList",
  data() {
    return {};
  },

  props: {
   list: {
      type: Array,
      required: true,
    },
    currentSearchItem: String,
	 visibleDropList: Boolean,
   checkForm: Boolean,
  },

  methods: {
	...mapMutations({
		updateCityList: 'weather/updateCityList',
    setCurrentCountry: "weather/setCurrentCountry",
    setCurrentCity: "weather/setCurrentCity",
	}),
    setSearchList(country) {
      this.updateCityList(country)
      this.$emit("update:currentSearchItem", country);
      this.$emit("update:visibleDropList", false);
      this.$emit("update:checkForm", true)
      if (this.$refs.drop.getAttribute("data-type") === "country") {
				this.setCurrentCountry(country)
        this.updateCityList(this.country);
        this.listItem = this.country
      } else {
				this.setCurrentCity(country)
        this.listItem = this.city
      }
    },
  },
  computed: {
    ...mapState({
      country: (state) => state.weather.country,
      city: (state) => state.weather.city,
    })
  }
};
</script>

<style lang="scss" scoped>
.drop {
  width: 230px;
  height: fit-content;
  position: absolute;
  max-height: 300px;
  background-color: #fff;
  border-radius: 5px;
  border: 1px solid #ccc;
  overflow-x: hidden;
  overflow-y:scroll;
  padding-left: 2px;
  background-color: rgba(transparent, 0.1);
  backdrop-filter: blur(5px);
  color: #1ce3cf;
	&__item {
		cursor: pointer;
    padding-top: 10px;
    padding-bottom: 10px;

    margin: 0;
	}
}
::-webkit-scrollbar {
	width: 10px;
	&-track {
		background-color: #c5e3f5;
	}

	&-thumb {
	background: linear-gradient(to bottom, #162da9, #1ce3cf );
	border-radius: 8px;
	height: 50px;
	}
}

</style>
