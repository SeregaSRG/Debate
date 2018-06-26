<template>
    <div>
        <div class="set shadow-block" @click="openEdit">
            <div>
                <p>{{ set.Repetition }}</p>
                <p>{{ set.Weight }}</p>
                <p>{{ set.RestTime }}</p>
            </div>
        </div>
        <div class="editor__wrapper" v-if="isOpened">
            <div class="editor__area">
                <div class="editor__button" @click="increment('Repetition')"><p>+</p></div>
                <p class="editor__count">{{ set.Repetition }}</p>
                <div class="editor__button" @click="decrement('Repetition')"><p>-</p></div>
            </div>
            <div class="editor__area">
                <div class="editor__button" @click="increment('Weight')"><p>+</p></div>
                <p class="editor__count">{{ set.Weight }}</p>
                <div class="editor__button" @click="decrement('Weight')"><p>-</p></div>
            </div>
            <div class="editor__area">
                <div class="editor__button" @click="increment('RestTime')"><p>+</p></div>
                <p class="editor__count">{{ set.RestTime }}</p>
                <div class="editor__button" @click="decrement('RestTime')"><p>-</p></div>
            </div>
        </div>
        <div class="next-button" @click="closeEdit" v-if="isOpened"><p>Сохранить изменения</p></div>
    </div>
</template>

<script>
export default {
  name: 'set',
  props: ['set'],
  data () {
    return {
      isOpened: false
    }
  },
  computed: {
  },
  methods: {
    close: function () {
      this.$emit('closeMe')
    },
    increment: function (type) {
      this.set[type] = this.set[type] + 1
    },
    decrement: function (type) {
      this.set[type] = this.set[type] - 1
    },
    openEdit: function () {
      this.isOpened = true
      this.$emit('closeAdd')
    },
    closeEdit: function () {
      this.isOpened = false
      this.$emit('openAdd')
    }
  },
  created: function () {
  }
}
</script>

<style lang="scss" scoped>
  @import '../../../main.scss';
  $cardWidth: 300px;
  $cardHeight: calc(#{$cardWidth} * 0.17);
  .set {
      width: $cardWidth;
      height: $cardHeight;
      margin: 15px auto 0 auto;
      position: relative;
      background-color: $background_module__light-color;
      border-radius: 15px;
      > div {
          padding: calc((#{$cardHeight} - 23px) / 2) ;
          display: flex;
          justify-content: space-between;
          p {
              color: $text-color;
              font-size: 20px;
          }
      }
  }
  .editor__wrapper {
      width: 300px;
      height: 100px;
      display: flex;
      margin-top: 40px;

      .editor__area {
          width: 30px;
          height: 100px;
          margin: auto;
          background-color: $background_module__light-color;
          display: flex;
          justify-content: space-between;
          flex-direction: column;

          p {
              text-align: center;
          }

          .editor__button {
              width: 30px;
              height: 30px;
              border-radius: 15px;
              display: flex;
              P {
                  margin: auto;
                  color: $accent-color;
                  font-size: 24px;
              }
          }
      }
  }
  .next-button {
      width: 300px;
      margin-top: 40px;
      position: relative;
  }
</style>
