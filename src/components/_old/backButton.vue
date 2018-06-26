<template>
    <div class="back-button" v-on:click="pushBack">
        Х
    </div>
</template>

<script>
export default {
  name: 'backButton',
  data () {
  },
  methods: {
    pushBack: function () {
      history.back()
    }
  }
}
</script>

<style lang="scss" scoped>
    @import '../main.scss';
    .back-button {
        position: absolute;
        color: $text-color;
        top: 10px;
        right: 10px;
    }
</style>
