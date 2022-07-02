<template>
  <form ref="form" @submit.prevent="setListItem()" class="search">
    <MyInput
      v-model="listItem"
      v-model:visible-drop-list="visibleDropList"
    ></MyInput>

    <DropList
      v-if="listItem !== '' || visibleDropList"
      v-model:currentSearchItem="listItem"
      :list="list"
      v-model:visible-drop-list="visibleDropList"
      v-model:checkForm="checkFormDropList"
      :data-type="$refs.form.getAttribute('data-type')"
    >
    </DropList>
  </form>
</template>
     @keydown.down="takeItem()"  // сделать спуск на список через нажатие на стрелку вниз. позже

<script>
import { mapState, mapMutations } from "vuex";

export default {
  name: "FormList",
  data() {
    return {
      listItem: "",
      visibleDropList: false,
      checkFormDropList: false,
    };
  },
  methods: {
    ...mapMutations({
      setCurrentSearchItem: "weather/setCurrentSearchItem",
      updateCityList: "weather/updateCityList",
      setCurrentCountry: "weather/setCurrentCountry",
      setCurrentCity: "weather/setCurrentCity",
    }),

    setListItem() {
      this.$emit("update:checkForm", true);
      this.visibleDropList = false;
      if (this.$refs.form.getAttribute("data-type") === "country") {
        this.setCurrentCountry(this.listItem);
        this.updateCityList(this.country);
        this.listItem = this.country;
      } else {
        this.setCurrentCity(this.listItem);
        this.listItem = this.city;
      }
    },
  },

  computed: {
    ...mapState({
      WEATHER_API: (state) => state.weather.WEATHER_API,
      searchItem: (state) => state.weather.searchItem,
      country: (state) => state.weather.country,
      city: (state) => state.weather.city,
    }),
  },
  props: {
    list: {
      type: Array,
    },
    checkForm: Boolean,
  },

  watch: {
    listItem(searchItem) {
      this.setCurrentSearchItem(searchItem);
    },

    checkFormDropList(checkForm) {
      this.$emit("update:checkForm", checkForm);
    },
  },
};
</script>

<style lang="scss" scoped>
.form {
  position: relative;
}
</style>