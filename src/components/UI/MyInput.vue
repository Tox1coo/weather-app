<template>
  <div class="block">
    <input
      type="text"
      :value="modelValue"
      @input="updateInput($event)"
		  @click="$emit('update:visibleDropList', true)"
      class="input"
    />
    <img class="search" :src="require('@/assets/search.svg')" alt="" />
  </div>
</template>

<script>
export default {
  name: "MyInput",

  props: {
    modelValue: [String, Number],
    visibleDropList: Boolean,
    placeholderInput:String,
  },

  methods: {
    updateInput(event) {
      this.$emit("update:visibleDropList", true);

      this.$emit("update:modelValue", event.target.value);
    },
  },
};
</script>

<style lang="scss" scoped>
.input {
  width: 200px;
  padding: 10px 15px 10px 10px;
  border-bottom-left-radius: 8px;
  border-top-right-radius: 8px;
  background-color: rgba(transparent, 0.1);
  position: relative;
  border-color: rgba($color: #1ce3cf, $alpha: 0.5);
  color: #1ce3cf;
  backdrop-filter: blur(5px);
}

.block {
  position: relative;
  width: 230px;
}

.search {
  position: absolute;
  right: 5px;
  z-index: 1000;
  top: 50%;
  transform: translateY(-50%);
}
</style>
