<template>
    <div class="tab-table__wrapper">
        <!-- <transition-group name="fade" mode="out-in"> -->
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
        <!-- </transition-group> -->
    </div>
</template>

<script>
export default {
  name: 'tab-table',
  props: ['tables'],
  created: function () {
    console.log()
  }
}
</script>

<style lang="scss" scoped>

    @import '../main.scss';

    .tab-table__wrapper {
        width: 98%;
        max-width: 400px;
        margin: 0 auto;

        .table {
            margin: 20px auto;
            display: flex;
            flex-direction: column;
            padding: 10px;
            border: 1px black solid;
            border-radius: 5px;

            .meta {
                display: flex;
                flex-direction: row;
                justify-content: space-between;
                padding-bottom: 16px;
                h1 {
                    font-size: 22px;
                    font-family: 'Proxima Nova Semibold';
                }
            }

            .table__row {
                width: 100%;
                display: flex;
                flex-direction: row;
                flex-wrap: wrap;

                .table__cell {
                    width: 50%;
                    padding-bottom: 10px;

                    h1 {
                        font-size: 20px;
                        font-family: 'Proxima Nova Semibold';
                    }
                    h5 {
                        font-family: 'Proxima Nova Light';
                    }
                    p {
                        font-size: 16px;
                        font-family: 'Proxima Nova Light';
                    }

                    &:nth-child(even) {
                        > * {
                            text-align: right;
                        }
                        border-left: 1px black solid;
                    }
                }
            }
        }
    }
</style>
