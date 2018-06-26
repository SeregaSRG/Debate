<template>
  <transition name="fade">
    <div class="trainings">
      <router-link :to="'programs/'+key"
         v-for="(value, key) in programs"
         :key="key"
         @click="clean"
      >
        <div class="training shadow-block">
          <p class="noselect">{{ value.name }}</p>
        </div>
      </router-link>
      <router-link to="programs/create">
        <div class="training new shadow-block">
          <p class="noselect">Создать программу..</p>
        </div>
      </router-link>
    </div>
  </transition>
</template>

<script>
export default {
  name: 'Programs',
  data () {
    return {
    }
  },
  methods: {
    clean: function () {
      this.$store.commit('programs/DELETEALL_PROGRAMS')
    }
  },
  computed: {
    programs: function () {
      return this.$store.getters['programs/getPrograms']
    }
  }
}
</script>

<style lang="scss" scoped>
  @import '../main.scss';
  .trainings {
    width: 100vw;
    height: 100%;
    padding-top: 5.5vw;
    padding-bottom: calc(100vw / 6.25);
    position: relative;
    z-index: 1;
    overflow-y: scroll;

    $cardWidth: calc(100vw - 11vw);
    $cardHeight: calc(#{$cardWidth} * 0.19);
    .training {
      width: $cardWidth;
      height: $cardHeight;
      margin: 15px auto 0 auto;
      position: relative;
      background-color: $background_module-color;
      border-radius: 15px;
      p {
        padding: calc((#{$cardHeight} - 23px) / 2) ;
        color: $text-color;
        font-size: 20px;
      }
    }
    .new p {
      color: $secondary-color;
    }
  }
</style>
