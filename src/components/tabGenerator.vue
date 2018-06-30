<template>
    <div class="generator">
        <div class="control__wrapper">
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
        <div class="control__buttons">
            <div class="oval-button" @click="createAllTab"><p>СГЕНЕРИРОВАТЬ</p></div>
            <div class="oval-button"><p>СОХРАНИТЬ</p></div>
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
      teams: null
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
      // ГЕНЕРАЦИЯ ТЭБА ДЛЯ КП
      this.kCreate(this.round)
    },
    kCreate: function (round) {
      this.tab['k'][round] = []
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
        // Выбор первой команды
        let firstTeam
        let firstTeamNumber
        iterations = 0
        do {
          firstTeamNumber = Math.floor(Math.random() * this.teams['k'].length)
          firstTeam = this.teams['k'][firstTeamNumber]
          iterations++
        } while (firstTeam.used && iterations < 100)
        this.teams['k'][firstTeamNumber]['used'] = true
        // Выбор второй команды
        let secondTeam
        let secondTeamNumber
        iterations = 0
        do {
          secondTeamNumber = Math.floor(Math.random() * this.teams['k'].length)
          secondTeam = this.teams['k'][secondTeamNumber]
          iterations++
        } while (secondTeam.used && iterations < 100)
        this.teams['k'][secondTeamNumber]['used'] = true
        // ПУШ
        this.tab['k'][round].push({
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
        width: 320px;
        height: 60px;
        margin: 0 auto;
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;

        .oval-button {
            width: 150px;
            height: 40px;
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
