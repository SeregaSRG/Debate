<template>
    <div class="generator">
        <div class="control__wrapper hidden-print">
            <div class="control__league">
                <router-link :to="'/admin/tabs/k/' + round" class="control__button"><p>КП</p></router-link>
                <router-link :to="'/admin/tabs/v/' + round" class="control__button"><p>ВШФ</p></router-link>
                <router-link :to="'/admin/tabs/b/' + round" class="control__button"><p>БПФ</p></router-link>
                <router-link :to="'/admin/tabs/e/' + round" class="control__button"><p>EN</p></router-link>
                <div class="active-bubble"></div>
            </div>
            <div class="control__round">
                <router-link :to="'/admin/tabs/'+league+'/1'" class="control__button"><p>1</p></router-link>
                <router-link :to="'/admin/tabs/'+league+'/2'" class="control__button"><p>2</p></router-link>
                <router-link :to="'/admin/tabs/'+league+'/3'" class="control__button"><p>3</p></router-link>
                <router-link :to="'/admin/tabs/'+league+'/4'" class="control__button"><p>4</p></router-link>
                <router-link :to="'/admin/tabs/'+league+'/5'" class="control__button"><p>5</p></router-link>
                <div class="active-bubble"></div>
            </div>
        </div>
        <div class="control__buttons hidden-print ">
            <div class="oval-button" @click="createAllTab"><p>СГЕНЕРИРОВАТЬ</p></div>
            <div class="oval-button" @click="saveTab"><p>СОХРАНИТЬ</p></div>
            <div class="oval-button">
                <input type="checkbox" id="isSide" class="noselect" v-model="config.isSide">
                <input type="checkbox" id="isClub" class="noselect" v-model="config.isClub">
            </div>
        </div>
        <tab-table
                :tables="tab[league][round]"
        ></tab-table>
    </div>
</template>

<script>
export default {
  name: 'tab-generator',
  data () {
    return {
      tab: null,
      judges: null,
      teams: null,
      config: {
        isSide: true,
        isClub: true
      }
    }
  },
  components: {
    'tabTable': () => import('./tabTable.vue')
  },
  watch: {
  },
  methods: {
    createAllTab: function () {
      this.judges = JSON.parse(JSON.stringify(this.$store.getters['speakers/getJudgesF']))
      this.teams = JSON.parse(JSON.stringify(this.$store.getters['speakers/getTeamsF']))
      // ГЕНЕРАЦИЯ ТЭБА ДЛЯ ТЕКУЩЕЙ ВКЛАДКИ
      this.create(this.league, this.round)
    },
    isSide (league, round, team, side) {
      if (this.config.isSide) {
        if (round === '1' || round === '2' || round === '5') {
          return true
        }
        let countStatement = 0
        let countNegation = 0
        for (let i = round - 1; i > 0; i--) {
          if (this.tab[league][i].find(x => x['teams'][0]['team'] === team.team) !== undefined) {
            countStatement++
          }
          if (this.tab[league][i].find(x => x['teams'][1]['team'] === team.team) !== undefined) {
            countNegation++
          }
        }
        if (round === '3') {
          if (side === 0) {
            if (countStatement === countNegation) {
              return true
            }
            return countNegation === 2
          } else {
            if (countStatement === countNegation) {
              return true
            }
            return countStatement === 2
          }
        }
        if (round === '4') {
          if (side === 0) {
            return countNegation === 2
          } else {
            return countStatement === 2
          }
        }
        return true
      } else {
        return true
      }
    },
    isPlayed (firstTeam, secondTeam, round) {
    },
    isConflict (judge, team) {
      return judge['club'] === team['club']
    },
    isClub (firstTeam, secondTeam) {
      if (this.config.isClub) {
        return firstTeam['club'] === secondTeam['club']
      } else {
        return false
      }
    },
    create: function (league, round) {
      console.group()
      this.tab[league][round] = []
      let numberOfSpeakers = Object.keys(this.teams[league]).length
      let numberOfRooms = Math.ceil(numberOfSpeakers / 2)
      console.log('Команд ' + league + ': ', this.teams[league])
      console.log('Румов: ', numberOfRooms)
      // Перебор румов для заполнения
      let judges = this.judges.filter((item) => {
        switch (league) {
          case 'k':
            return item.league.indexOf('КП') !== -1
          case 'v':
            return item.league.indexOf('ВШФ') !== -1
          case 'b':
            league = 'b'
            break
          case 'e':
            league = 'e'
            break
          default:
            league = 'e'
            break
        }
      })
      console.log('Судей: ', judges)
      if (judges.length < numberOfRooms) {
        console.error('no judges')
        alert('no judges')
        console.groupEnd()
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
        // console.log('iterations', iterations)
        // Выбор первой команды
        let firstTeam
        let firstTeamNumber
        iterations = 0
        do {
          firstTeamNumber = Math.floor(Math.random() * numberOfSpeakers)
          firstTeam = this.teams[league][firstTeamNumber]
          iterations++
        } while (
          (
            this.isConflict(judges[judgeNumber], firstTeam) ||
            !this.isSide(league, round, firstTeam) ||
            firstTeam.used
          ) && iterations < 100)
        this.teams[league][firstTeamNumber]['used'] = true
        if (iterations > 99) {
          console.error('firstTeam', iterations)
        }
        // Выбор второй команды
        let secondTeam
        let secondTeamNumber
        iterations = 0
        do {
          secondTeamNumber = Math.floor(Math.random() * numberOfSpeakers)
          secondTeam = this.teams[league][secondTeamNumber]
          iterations++
        } while (
          (
            this.isConflict(judges[judgeNumber], secondTeam) ||
            !this.isSide(league, round, secondTeam) ||
            secondTeam.used ||
            this.isClub(firstTeam, secondTeam)
          ) && iterations < 100)
        this.teams[league][secondTeamNumber]['used'] = true
        if (iterations > 99) {
          console.error(
            'isConflict:', this.isConflict(judges[judgeNumber], secondTeam),
            'isSide:', secondTeam.used,
            'isUsed:', !this.isSide(league, round, secondTeam),
            'isClub:', this.isClub(firstTeam, secondTeam)
          )
        }
        // ПУШ
        this.tab[league][round].push({
          meta: {
            room: nowRoom + 1,
            judge: judge.surname + ' ' + judge.name
          },
          teams: {
            '0': firstTeam,
            '1': secondTeam
          }
        })
      }
      console.groupEnd()
    },
    saveTab () {
      this.$store.dispatch('tab/saveTab', {
        'tab': this.tab
      })
        .then(() => {
          console.log('saved')
        })
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
    },
    judgesF: function () {
      return this.$store.getters['speakers/getJudgesF']
    },
    teamsF: function () {
      return this.$store.getters['speakers/getTeamsF']
    },
    tabF: function () {
      return this.$store.getters['tab/getTab']
    }
  },
  created: function () {
    if (!this.$route.params.league || !this.$route.params.round) {
      this.$router.push('/admin/tabs/k/1')
    }
    this.tab = JSON.parse(JSON.stringify(this.$store.getters['tab/getTab']))
    /*
    // this.tab = this.$store.dispatch('tab/getTab', {})
    this.judges = this.$store.getters['speakers/getJudgesF']
    this.teams = this.$store.getters['speakers/getTeamsF']
    */
  }
}
</script>

<style lang="scss" scoped>
    @import '../main.scss';

    .control__buttons {
        width: 500px;
        height: 60px;
        margin: 0 auto;
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;

        .oval-button {
            width: 150px;
            height: 40px;
            display: flex;
            align-items: center;
            justify-content: space-evenly;
            flex-direction: row;
            input {
                height: 20px;
                margin: 0;
            }
            label {
                cursor: pointer;
                margin: 0;
            }
        }
    }

    .control__wrapper {
        width: 100%;
        height: 140px;
        margin: 0 auto;
        display: flex;
        justify-content: space-evenly;
        flex-direction: column;
        align-items: center;
        background: linear-gradient(to right, #30AAFF, #2BD0FF);

        .control__league, .control__round{
            width: 320px;
            height: 50px;
            background-color: rgba(255, 255, 255, 0.5);
            border-radius: 25px;
            display: flex;
            z-index: 1;
            position: relative;
        }

        .control__button {
            height: 50px;
            border-radius: 25px;
            display: flex;
            z-index: 3;
            p {
                margin: auto;
                font-family: 'Proxima Nova Semibold';
            }
        }

        .active-bubble {
            transition: .3s $cubic_bezier;
            height: 50px;
            border-radius: 25px;
            position: absolute;
            z-index: 2;
            background-color: rgba(255, 255, 255, 0.9);
        }

        .control__league {
            .control__button {
                width: 25%;
            }
            .active-bubble {
                width: 25%;
            }
            @for $i from 1 through 4 {
                :nth-child(#{$i}).router-link-active {
                    ~ .active-bubble{
                        transform: translateX(#{($i * 80 - 80)}px);
                    }
                }
            }
        }
        .control__round {
            .control__button {
                width: 20%;
            }
            .active-bubble {
                width: 20%;
            }
            @for $i from 1 through 5 {
                :nth-child(#{$i}).router-link-active {
                    ~ .active-bubble{
                        transform: translateX(#{($i * 64 - 64)}px);
                    }
                }
            }
        }
    }
</style>
