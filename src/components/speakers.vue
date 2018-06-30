<template>
    <div>
        <div class="control__wrapper">
            <div class="oval-button" @click="getSpeakers"><p>ОБНОВИТЬ</p></div>
            <div class="oval-button" @click="saveSpeakers"><p>СОХРАНИТЬ</p></div>
        </div>
        <div class="speakers__wrapper">
            <div class="card shadow-block creator">
                <input placeholder="Название команды.." v-model.trim="newSpeaker.team"/>
                <input placeholder="Имя.." v-model.trim="newSpeaker.name"/>
                <input placeholder="Фамилия.." v-model.trim="newSpeaker.surname"/>
                <input placeholder="Клуб.." list="club" v-model.trim="newSpeaker.club"/>
                <datalist id="club">
                    <option
                            v-for="(club, key) in clubs"
                            :key="key"
                    >{{ key }}</option>
                </datalist>
                <input placeholder="Лига.." list="league" v-model.trim="newSpeaker.league"/>
                <datalist id="league">
                    <option>КП</option>
                    <option>ВШФ</option>
                    <option>БПФ</option>
                    <option>EN</option>
                </datalist>
                <div class="oval-button" @click="addSpeaker"><p>ДОБАВИТЬ</p></div>
            </div>
            <div class="card shadow-block"
                 v-for="(speaker, key) in speakers"
                 :key="key"
            >
                <input placeholder="Название команды.." v-model.trim="speaker.team"/>
                <input placeholder="Имя.." class="grey" v-model.trim="speaker.name"/>
                <input placeholder="Фамилия.." class="grey" v-model.trim="speaker.surname"/>
                <input placeholder="Клуб.." v-model.trim="speaker.club"/>
                <input placeholder="Лига.." v-model.trim="speaker.league"/>
                <div class="oval-button" @click="deleteSpeaker(key)"><p>УДАЛИТЬ</p></div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
  name: 'speakers',
  data () {
    return {
      speakers: [],
      newSpeaker: {
        name: '',
        surname: '',
        team: '',
        club: '',
        league: ''
      }
    }
  },
  methods: {
    getSpeakers: function () {
      this.$store.dispatch('speakers/getSpeakers')
        .then(() => {
          this.refreshSpeakers()
        })
        .catch((data) => {
          console.error(data)
          alert(data)
        })
    },
    refreshSpeakers: function () {
      this.speakers = this.$store.getters['speakers/getSpeakers']
    },
    saveSpeakers: function () {
      this.$store.dispatch('speakers/saveSpeakers', {
        'speakers': this.speakers
      })
    },
    addSpeaker: function () {
      let clone = {}
      for (let key in this.newSpeaker) {
        clone[key] = this.newSpeaker[key]
      }
      this.speakers.push(clone)
      this.saveSpeakers()
      this.newSpeaker = {
        name: '',
        surname: '',
        team: '',
        club: '',
        league: ''
      }
    },
    deleteSpeaker: function (id) {
      this.speakers.splice(id, 1)
    }
  },
  computed: {
    clubs: function () {
      return this.$store.getters['speakers/getClubs']
    }
  },
  created: function () {
    this.getSpeakers()
    console.log(this.$store.getters['speakers/getTeamsF'])
  }
}
</script>

<style lang="scss" scoped>
    @import '../main.scss';
    .speakers__wrapper {
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

    .grey {
        background-color: #edfaff;
    }
</style>
