<template>
  <div class="drop">
    <p
      class="drop__item"
      :value="country"
      v-for="country in countries"
      :key="country"
      @click="setCountry(country)"
    >
      {{ country }}
    </p>
  </div>
</template>

<script>
/* eslint-disable prettier/prettier */

export default {
  name: "DropList",
  data() {
    return {};
  },

  props: {
    countries: {
      type: Array,
      required: true,
    },
    currentCountry: String,
	 visibleDropList: Boolean,
  },

  methods: {
    setCountry(country) {
      this.$emit("update:currentCountry", country);
		this.$emit("update:visibleDropList", false);
    },
  },
};
</script>

<style lang="scss" scoped>
.drop {
  width: 230px;
  height: fit-content;
  max-height: 300px;
  background-color: #fff;
  border-radius: 5px;
  border: 1px solid #ccc;
  overflow-x: hidden;
  overflow-y:scroll;
  padding-left: 2px;
  backdrop-filter: blur(2px);
  background: rgba( #fff, 0.8);

	&__item {
		cursor: pointer;
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
