<template>
    <div class="generator">
        <div
            v-for="(league, key) in teams"
            :key="key"
        >
            <div
                    v-for="(team, key) in league"
                    :key="key"
            >
                <h1>{{ key }}</h1>
                <h1>{{ team }}</h1>
            </div>
        </div>
    </div>
</template>

<script>
export default {
  name: 'tab-generator',
  data () {
    return {
      tab: {},
      judges: null,
      teams: null
    }
  },
  methods: {
    createAllTab: function () {
      // ГЕНЕРАЦИЯ ТЭБА ДЛЯ КП
      this.tab = this.$store.getters['tab/getTab']
      this.kCreate(1)
      console.log('this.tab', this.tab)
    },
    kCreate: function (round) {
      let numberOfSpeakers = Object.keys(this.teams['k']).length
      let numberOfRooms = Math.ceil(numberOfSpeakers / 2)
      console.log('Команд КП: ', numberOfSpeakers)
      console.log('Румов: ', numberOfRooms)
      // Перебор румов для заполнения
      let judges = this.judges.filter((item) => {
        return item.league.indexOf('КП') !== -1
      })
      console.log('Судей: ', judges)
      if (judges.length < numberOfRooms) {
        console.error('no judges')
        alert('no judges')
        return 'no judges'
      }
      for (let nowRoom = 0; nowRoom < numberOfRooms; nowRoom++) {
        // Выбор судьи
        let judge
        let judgeNumber
        let iterations = 0
        do {
          judgeNumber = Math.floor(Math.random() * judges.length)
          judge = judges[judgeNumber]
          iterations++
        } while (judge.used && iterations < 100)
        judges[judgeNumber]['used'] = true
        console.log('iterations', iterations)
        //
        this.tab['k'][round].push({
          meta: {
            room: nowRoom + 1,
            judge: judge.surname + ' ' + judge.name
          }
        })
      }
    }
  },
  computed: {
    league: function () {
      if (this.$route.params.league) {
        return this.$route.params.league
      } else {
        return 'k'
      }
    },
    round: function () {
      if (this.$route.params.round) {
        return this.$route.path.slice(-1)
      } else {
        return '1'
      }
    }
  },
  created: function () {
    if (!this.$route.params.league || !this.$route.params.round) {
      this.$router.push('/admin/tabs/k/1')
    }
    // this.tab = this.$store.dispatch('tab/getTab', {})
    this.tab = this.$store.getters['tab/getTab']
    this.judges = this.$store.getters['speakers/getJudgesF']
    this.teams = this.$store.getters['speakers/getTeamsF']
    this.createAllTab()
  }
}
</script>

<style lang="scss" scoped>

</style>
