<template>
  <div class="info">
    <label for="">
      {{ typeBlock }}
    </label>
    <p @click="changeInfo()">{{ itemBlock }}</p>
  </div>
</template>

<script>
export default {
  name: "InfoBlock",
  data() {
    return {};
  },

  props: {
    typeBlock: String,
    itemBlock: String,
	 visibleInfoBlock: Boolean
  },
  methods: {
	changeInfo() {
		this.$emit("update:visibleInfoBlock", false)
	}
  }
};
</script>

<style lang="scss" scoped>

.info {
	display: flex;
	justify-content: center;
	align-items: center;
	width: 200px;
	color: #4cf6ff;
	background-color: transparent;
	backdrop-filter: blur(20px);
	border-radius: 20px;
	border: 1px solid #4cf6ff;
	p {
		cursor: pointer;
		text-decoration:  underline dashed;

	}
}
</style>