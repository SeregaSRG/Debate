<template>
    <div>
        <div class="teams__wrapper"
             v-for="(league, key) in teams"
             :key="key"
        >
            <div class="card shadow-block"
                 v-for="(team, key) in league"
                 :key="key"
            >
                <input placeholder="Название команды.." :value="team[0].team" readonly/>
                <input placeholder="Клуб.." :value="team[0].club" readonly/>
                <input
                        v-for="(speaker, key) in team"
                        :key="key"
                        readonly
                        :value="speaker.name + ' ' + speaker.surname"
                />
                <input placeholder="Клуб.." v-model="team[0].league" readonly/>
            </div>
        </div>
    </div>
</template>

<script>
export default {
  name: 'teams',
  computed: {
    teams: function () {
      return this.$store.getters['speakers/getTeams']
    }
  },
  created: function () {
    console.log('created', this.$store.getters['speakers/getTeams'])
  }
}
</script>

<style lang="scss" scoped>
    @import '../main.scss';
    .teams__wrapper {
        width: 90%;
        height: auto;
        padding: 5px;
        margin: 0 auto;
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;

        &:nth-child(even) {
            background-color: #f5f5f5;
        }

        .card {
            width: 240px;
            padding: 14px;
            border-radius: 6px;
            margin: 20px 20px 20px 20px;
            display: flex;
            flex-direction: column;
            justify-content: space-evenly;
            background-color: white;
            input {
                padding: 14px;
                margin-bottom: 10px;
            }
        }
    }
</style>
