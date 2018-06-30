<template>
    <div>
        <div class="control__wrapper">
            <div class="oval-button" @click="refreshJudges"><p>ОБНОВИТЬ</p></div>
            <div class="oval-button" @click="saveJudges"><p>СОХРАНИТЬ</p></div>
        </div>
        <div class="judges__wrapper">
            <div class="card shadow-block creator">
                <input placeholder="Имя.." v-model.trim="newJudge.name"/>
                <input placeholder="Фамилия.." v-model.trim="newJudge.surname"/>
                <input placeholder="Клуб.." list="club" v-model.trim="newJudge.club"/>
                <datalist id="club">
                    <option>Свободный</option>
                    <option>Гимназия №</option>
                    <option>Школа №</option>
                </datalist>
                <input placeholder="Лига.." v-model.trim="newJudge.league"/>
                <input placeholder="Пароль.." v-model.trim="newJudge.password"/>
                <div class="oval-button" @click="addJudge"><p>ДОБАВИТЬ</p></div>
            </div>
            <div class="card shadow-block"
                 v-for="(speaker, key) in judges"
                 :key="key"
            >
                <input placeholder="Имя.." v-model.trim="speaker.name"/>
                <input placeholder="Фамилия.." v-model.trim="speaker.surname"/>
                <input placeholder="Клуб.." v-model.trim="speaker.club"/>
                <input placeholder="Лига.." v-model.trim="speaker.league"/>
                <input placeholder="Пароль.." v-model.trim="speaker.password"/>
                <div class="oval-button" @click="deleteJudge(key)"><p>УДАЛИТЬ</p></div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
  name: 'judges',
  data () {
    return {
      judges: [],
      newJudge: {
        name: '',
        surname: '',
        club: '',
        league: '',
        password: ''
      }
    }
  },
  methods: {
    getJudges: function () {
      this.$store.dispatch('speakers/getJudges')
        .then(() => {
          this.refreshJudges()
        })
        .catch((data) => {
          console.error(data)
          alert(data)
        })
    },
    refreshJudges: function () {
      this.judges = this.$store.getters['speakers/getJudges']
    },
    saveJudges: function () {
      this.$store.dispatch('speakers/saveJudges', {
        'judges': this.judges
      })
    },
    addJudge: function () {
      let clone = {}
      for (let key in this.newJudge) {
        clone[key] = this.newJudge[key]
      }
      this.judges.push(clone)
      this.saveJudges()
      this.newJudge = {
        name: '',
        surname: '',
        club: '',
        league: '',
        password: ''
      }
    },
    deleteJudge: function (id) {
      this.judges.splice(id, 1)
    }
  },
  created: function () {
    this.getJudges()
  }
}
</script>

<style lang="scss" scoped>
    @import '../main.scss';
    .judges__wrapper {
        width: 90%;
        height: 100%;
        padding: 5px;
        margin: 0 auto;
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;

        .card {
            width: 240px;
            padding: 14px;
            border-radius: 6px;
            margin: 0 40px 40px 0;
            display: flex;
            flex-direction: column;
            justify-content: space-evenly;
            input {
                padding: 14px;
                margin-bottom: 10px;
            }
        }

        .creator {
            background-color: #f0f0f0;
            input, .oval-button {
                background-color: white!important;
            }
        }
    }

    .control__wrapper {
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
</style>
