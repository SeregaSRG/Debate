<template>
    <div>
        <div class="exercise shadow-block"
             @click="open"
        >
            <p>{{ exercise.Name }}</p>
        </div>
        <sets
             v-if="isOpened.sets"
             :exercise="exercise"
             @closeMe="close"
        ></sets>
    </div>
</template>

<script>
export default {
  name: 'exercise',
  props: ['exercise', 'number'],
  components: {
    'sets': () => import('./sets.vue')
  },
  data () {
    return {
      isOpened: {
        sets: false
      }
    }
  },
  computed: {
  },
  methods: {
    open: function () {
      this.isOpened.sets = true
    },
    close: function () {
      this.isOpened.sets = false
      if (this.exercise.Name === '') {
        this.exercise.Name = 'Упражнение ' + (this.number + 1)
      }
    }
  },
  created: function () {
    if (this.exercise.Name === '') {
      this.isOpened.sets = true
    }
  }
}
</script>

<style lang="scss" scoped>
    @import '../../../main.scss';

    $cardWidth: 300px;
    $cardHeight: calc(#{$cardWidth} * 0.17);
    .exercise {
        width: $cardWidth;
        height: $cardHeight;
        margin: 15px auto 0 auto;
        position: relative;
        background-color: $background_module__light-color;
        border-radius: 15px;
        p {
            padding: calc((#{$cardHeight} - 23px) / 2) ;
            color: $text-color;
            font-size: 20px;
        }
    }
</style>
