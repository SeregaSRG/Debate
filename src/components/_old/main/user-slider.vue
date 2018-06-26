<template>
  <div class="user-slider">
    <div class="slider__wrapper">
      <div class="slider__arrow">
        <p>
          ←
        </p>
      </div>
      <div class="slider__name">
        <p>Vladimir Holodkov</p>
      </div>
      <div class="slider__arrow">
        <p>
          →
        </p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'user-slider'
}
</script>

<style lang="scss" scoped>
.slider__wrapper {
  display: flex;
  width: 80%;
  height: 80px;
  margin: 50px auto 0 auto;
  background-color: rgba(0, 0, 0, 0.5);
  color: #d6d6d6;

  .slider__name {
    display: flex;
    width: calc(100% - 80px);
    height: 100%;
    p {
      margin: auto;
    }
  }

  .slider__arrow {
    width: 40px;
    height: 100%;
    cursor: pointer;
    display: flex;
    p {
      margin: auto;
    }
  }
}
</style>
