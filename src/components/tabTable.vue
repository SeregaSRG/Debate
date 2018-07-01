<template>
    <div class="tab-table__wrapper">
        <!-- <transition-group name="fade" mode="out-in"> -->
            <div class="table"
                 v-for="(table, key) in tables"
                 :key="key"
            >
                <div class="meta">
                    <input class="h1" :value="'Рум №' + table.meta.room">
                    <input class="h1 judge" v-model="table.meta.judge">
                </div>
                <div class="table__row">
                    <div class="table__cell"
                         v-for="(team, key) in table.teams"
                         :key="key"
                    >
                        <input class="h1" v-model="team.team">
                        <input class="h2" v-model="team.club">
                    </div>
                </div>
            </div>
        <!-- </transition-group> -->
    </div>
</template>

<script>
export default {
  name: 'tab-table',
  props: ['tables'],
  created: function () {
  }
}
</script>

<style lang="scss" scoped>

    @import '../main.scss';

    .tab-table__wrapper {
        width: 98%;
        max-width: 400px;
        margin: 0 auto;

        input {
            all: unset;
        }

        .judge {
            text-align: right;
        }

        .h1 {
            width: 50%;
            font-size: 22px;
            font-family: 'Proxima Nova Semibold';
            margin: 0;
            padding: 0;
        }

        .table__cell {
            .h1 {
                width: 100%;
            }

            .h2 {
                width: 100%;
                font-size: 18px;
                font-family: 'Proxima Nova Light';
                margin: 0;
                padding: 0;
            }
        }
    }
</style>
