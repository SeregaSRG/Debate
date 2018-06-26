<template>
  <div class="Create">
    <div class="day-selector--wrapper">
      <input v-model="program.name" placeholder="Название программы.."/>
      <div>
        <router-link :to="'/programs/create/'+day.number" class="day-selector"
                     v-for="day in generator"
                     :key="day.number"
                     :class="{ 'filled':  program.trainingDays[day.number].Exercises.length !== 0}"
        >
          <p>{{ day.day }}</p>
        </router-link>
      </div>
    </div>
    <div class="save-button" @click="saveProgram">
      <p>Сохранить</p>
    </div>
    <router-view
            :localId="localId"
            :trainingDays="program.trainingDays"
    ></router-view>
  </div>
</template>

<script>
export default {
  name: 'Create',
  data () {
    return {
      data: '',
      localId: '',
      program: {
        name: '',
        type: '1',
        trainingDays: {}
      }
    }
  },
  methods: {
    saveProgram: function () {
      this.$store.commit('programs/CREATE_PROGRAM', {
        localId: this.localId,
        program: this.program
      })
      this.$router.push('/programs')
    }
  },
  computed: {
    generator: function () {
      let mass = []
      let days = ['ПН', 'ВТ', 'СР', 'ЧТ', 'ПТ', 'Сб', 'ВС', 'ПН', 'ВТ', 'СР', 'ЧТ', 'ПТ', 'Сб', 'ВС']
      for (let i = 1; i < 15; i++) {
        mass.push({
          number: i,
          day: days[i - 1]
        })
      }
      return mass
    }
  },
  created: function () {
    this.localId = String(new Date().getTime()).slice(-8)
    for (let i = 1; i < 15; i++) {
      this.$set(this.program.trainingDays, i, {Exercises: []})
    }
  }
}
</script>

<style lang="scss" scoped>
  @import '../../main.scss';
  .Create {
    width: 100vw;
    height: 100vh;
    color: $text-color;
    background-color: $background_module-color;
    z-index: 100;
    position: relative;
  }

  .day-selector--wrapper {
    width: 300px;
    padding-top: 20px;
    padding-bottom: 20px;
    margin: 0 auto;

    > div {
      display: flex;
      justify-content: space-around;
      flex-wrap: wrap;
      margin-top: 2.4px;

      .day-selector {
        width: 40px;
        height: 40px;
        border-radius: 12px;
        border: 2px solid $secondary-color;
        display: flex;
        color: $secondary-color;
        margin-top: 5px;
        transition: .2s;

        p {
          margin: auto;
        }

        &.router-link-active {
          border: 2px solid $accent-color;
          color: $text-color;
        }

        &.filled {
          border: 2px solid $accent-color;
          color: $accent-color;

          &.router-link-active {
            background-color: transparent;
            color: $text-color;
          }
        }
      }
    }
  }

  .save-button {
    transition: all .2s;
    width: 100%;
    max-width: 300px;
    height: 48px;
    margin: 0 auto;
    border: 1px solid $accent-color;
    display: flex;
    border-radius: 12px;
    color: $accent-color;

    p {
      margin: auto;
    }
  }

  .separation {
    width: 100vw;
  }
</style>
