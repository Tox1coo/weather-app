<template>
  <div class="loading">
    <span></span>
    <span></span>
    <span></span>
  </div>
</template>

<script>
export default {
  name: "IsLoading",
};
</script>

<style lang="scss" scoped>
.loading {
  position: absolute;
  top: 50%;
  left: 50%;
  z-index: 10;
  transform: translate(-50%, -50%);
  display: flex;
  gap: 10px;
  span {
    display: inline-block;
    width: 20px;
    height: 20px;
    border: 2px solid #ccc;
    border-radius: 50%;
    background-color: transparent;
    backdrop-filter: blur(5px);
  }
}

@for $i from 1 through 3 {
  .loading span:nth-child(#{$i}) {
    animation: loading 1s ease-in-out $i * 0.3s infinite;
  }
}

@keyframes loading {
  0% {
    transform: translateY(-10px);
    opacity: 1;
  }
  25% {
    transform: translateY(-5px);
    opacity: 0.5;
  }
  50% {
    transform: translateY(0px);
    opacity: 0;
  }
  75% {
    transform: translateY(-5px);
    opacity: 0.5;
  }
  100% {
    transform: translateY(-10px);
    opacity: 1;
  }
}
</style>