<template>
  <div class="Program">
    <input v-model="program.name" placeholder="Название программы.."/>
    <div class="day-wrapper"
         v-for="(value, key) in program.trainingDays"
         :key="key"
         v-if="value.Exercises.length"
    >
      <h3>День {{key}}</h3>
      <div class="card shadow-block"
           v-for="(data, key) in value.Exercises"
           :key="key"
      >
        <p>{{ data.Name }}</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'program',
  data () {
    return {
    }
  },
  computed: {
    currentName: function () {
      return this.$route.params.name
    },
    program: function () {
      return this.$store.getters['programs/getProgram'](this.currentName)
    }
  },
  created: function () {
    console.log(JSON.stringify(this.$store.getters['programs/getProgram'](this.currentName)))
  }
}
</script>

<style lang="scss" scoped>
  @import '../../main.scss';
  .Program {
    width: 100vw;
    height: 100vh;
    color: $text-color;
    background-color: $background_module-color;
    z-index: 100;
    position: relative;
    display: flex;
    flex-direction: column;
    overflow-y: scroll;
    input {
      width: 300px;
      margin: 30px auto;
      text-align: center;
    }

    .day-wrapper {
      width: 320px;
      border: 1px solid $secondary-color;
      border-radius: 5px;
      padding: 10px;
      margin: 10px auto;
      h3 {
        color: $text-color;
      }
    }

    $cardWidth: 300px;
    $cardHeight: calc(#{$cardWidth} * 0.17);
    .card {
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
  }
</style>
