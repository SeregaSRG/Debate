<template>
    <div class="judging__wrapper">
        <router-link to="/">← К ТЭБ</router-link>
        <div class="table"
             v-for="(table, key) in tables"
             :key="key"
        >
            <div class="meta">
                <h1>{{ table.meta.room }}</h1>
                <h1>{{ table.meta.judge }}</h1>
            </div>
            <div class="table__row">
                <div class="table__cell"
                     v-for="(team, key) in table.teams"
                     :key="key"
                >
                    <h1>{{ team.name }}</h1>
                    <h5>{{ team.club }}</h5>
                    <p
                            v-for="(command, key) in team.command"
                            :key="key"
                    >{{ command }}</p>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
  name: 'judging',
  computed: {
    tables: function () {
      // return this.$store.getters['tab/getTabByJudge'](this.$store.getters['auth/getName'])
      return this.$store.getters['tab/getTabByJudge']('Имя Судьи')
    }
  }
}
</script>

<style lang="scss" scoped>

    @import '../main.scss';

    .judging__wrapper {
        width: 98%;
        max-width: 400px;
        margin: 0 auto;
        padding-top: 15px;

        a {
            color: #000;
            padding: 5px;
            border-radius: 4px;
            border: 1px black solid;
            margin: 0 0 15px 10px;
        }
    }
</style>
