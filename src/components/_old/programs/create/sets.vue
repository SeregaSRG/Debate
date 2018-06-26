<template>
    <transition name="openBottom">
        <div class="sets shadow-block">
            <h3 class="closeButton noselect" @click="close">СОХРАНИТЬ</h3>
            <div class="sets__wrapper">
                <input v-model="exercise.Name" placeholder="Название упражнения..">
                <set
                     v-for="(value, key) in exercise.Sets"
                     :key="key"
                     :set="value"
                     @openAdd="openAdd"
                     @closeAdd="closeAdd"
                ></set>
                <div class="editor__wrapper" v-if="isOpened.add">
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
                <div class="next-button" @click="addSet" v-if="isOpened.add"><p>Добавить подход</p></div>
            </div>
        </div>
    </transition>
</template>

<script>
export default {
  name: 'sets',
  props: ['exercise'],
  components: {
    'set': () => import('./set.vue')
  },
  data () {
    return {
      generator: [
        ['Repetition', 'Weight', 'RestTime'],
        ['Repetition', 'Weight', 'RestTime'],
        ['Repetition', 'Weight', 'RestTime']
      ],
      set: {
        Repetition: 0,
        Weight: 0,
        RestTime: 0
      },
      isOpened: {
        add: true
      }
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
    addSet: function () {
      this.exercise.Sets.push({
        Repetition: this.set.Repetition,
        Weight: this.set.Weight,
        RestTime: this.set.RestTime
      })
    },
    openAdd: function () {
      this.isOpened.add = true
    },
    closeAdd: function () {
      this.isOpened.add = false
    }
  },
  created: function () {
  }
}
</script>

<style lang="scss" scoped>
  @import '../../../main.scss';
  .next-button {
      width: 300px;
      margin-top: 40px;
      position: relative;
  }
  .sets {
      width: 100vw;
      height: 100vh;
      position: absolute;
      z-index: 100;
      background-color: $background_module-color;
      top: 0;
      left: 0;
      overflow-y: scroll;

      .sets__wrapper {
          padding-top: 55px;
          width: 300px;
          margin: 0 auto;

          input {
              text-align: center;
          }

          .editor__wrapper {
              width: 300px;
              height: 100px;
              display: flex;
              margin-top: 80px;
              position: relative;
              &:before {
                  content: '';
                  position: absolute;
                  top: -40px;
                  background-color: $accent-color;
                  width: 300px;
                  height: 1px;
                  box-shadow: 0 0 10px 0px rgba(0, 0, 0, 0.4);
              }

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
      }
  }

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

  .openBottom-enter-active, .openBottom-leave-active {
      transition: transform .5s;
  }
  .openBottom-enter {
      transform: translateY(100vh);
  }
  .openBottom-leave-to {
      transform: translateY(100vh);
  }
</style>
