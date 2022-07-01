<template>
  <form @submit.prevent="setListItem()" class="search">
    <MyInput
      v-model="listItem"
      v-model:visible-drop-list="visibleDropList"
    ></MyInput>
    <DropList
      v-if="listItem !== '' && visibleDropList"
      v-model:currentSearchItem="listItem"
      :list="list"
      v-model:visible-drop-list="visibleDropList"
    >
    </DropList>
  </form>
</template>

<script>
import { mapState, mapMutations, } from "vuex";

export default {
  name: "FormList",
  data() {
    return {
      listItem: "",
      visibleDropList: false,
    };
  },
  methods: {
    ...mapMutations({
      setCurrentSearchItem: "weather/setCurrentSearchItem",
    }),


    setListItem() {
      this.visibleDropList = false;
    },
  },

  computed: {
    ...mapState({
      WEATHER_API: (state) => state.weather.WEATHER_API,
      searchItem: (state) => state.weather.searchItem,
    }),
  },
  props: {
    list: {
      type: Array,
    },
  },

  watch: {
    listItem(searchItem) {
      this.setCurrentSearchItem(searchItem);
    },
  },

};
</script>

<style>
</style>