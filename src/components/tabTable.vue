<template>
    <div class="tab-table__wrapper">
        <!--
        <div class="table"
        >
            <div class="table__row"
            >
                <div class="table__cell">
                    <h1></h1>
                    <h3
                    ></h3>
                </div>
            </div>
        </div>
        -->
        <div class="table">
            <div class="meta">
                <h1>Рум 1 "Название"</h1>
                <h1>Ян Соколов</h1>
            </div>
            <div class="table__row">
                <div class="table__cell">
                    <h1>Название команды</h1>
                    <h5>Название клуба</h5>
                    <p>Екатерина Васильева</p>
                    <p>Екатерина Васильева</p>
                    <p>Екатерина Васильева</p>
                </div>
                <div class="table__cell">
                    <h1>Название команды</h1>
                    <h5>Название клуба</h5>
                    <p>Екатерина Васильева</p>
                    <p>Екатерина Васильева</p>
                    <p>Екатерина Васильева</p>
                </div>
            </div>
            <div class="table__row">
                <div class="table__cell">
                    <h1>Название команды</h1>
                    <h5>Название клуба</h5>
                    <p>Екатерина Васильева</p>
                    <p>Екатерина Васильева</p>
                    <p>Екатерина Васильева</p>
                </div>
                <div class="table__cell">
                    <h1>Название команды</h1>
                    <h5>Название клуба</h5>
                    <p>Екатерина Васильева</p>
                    <p>Екатерина Васильева</p>
                    <p>Екатерина Васильева</p>
                </div>
            </div>
        </div>
        <div class="table">
            <div class="meta">
                <h1>Рум 1 "Название"</h1>
                <h1>Ян Соколов</h1>
            </div>
            <div class="table__row">
                <div class="table__cell">
                    <h1>Название команды</h1>
                    <h5>Название клуба</h5>
                    <p>Екатерина Васильева</p>
                    <p>Екатерина Васильева</p>
                    <p>Екатерина Васильева</p>
                </div>
                <div class="table__cell">
                    <h1>Название команды</h1>
                    <h5>Название клуба</h5>
                    <p>Екатерина Васильева</p>
                    <p>Екатерина Васильева</p>
                    <p>Екатерина Васильева</p>
                </div>
            </div>
            <div class="table__row">
                <div class="table__cell">
                    <h1>Название команды</h1>
                    <h5>Название клуба</h5>
                    <p>Екатерина Васильева</p>
                    <p>Екатерина Васильева</p>
                    <p>Екатерина Васильева</p>
                </div>
                <div class="table__cell">
                    <h1>Название команды</h1>
                    <h5>Название клуба</h5>
                    <p>Екатерина Васильева</p>
                    <p>Екатерина Васильева</p>
                    <p>Екатерина Васильева</p>
                </div>
            </div>
        </div>
        <div class="table">
            <div class="meta">
                <h1>Рум 1 "Название"</h1>
                <h1>Ян Соколов</h1>
            </div>
            <div class="table__row">
                <div class="table__cell">
                    <h1>Название команды</h1>
                    <h5>Название клуба</h5>
                    <p>Екатерина Васильева</p>
                    <p>Екатерина Васильева</p>
                    <p>Екатерина Васильева</p>
                </div>
                <div class="table__cell">
                    <h1>Название команды</h1>
                    <h5>Название клуба</h5>
                    <p>Екатерина Васильева</p>
                    <p>Екатерина Васильева</p>
                    <p>Екатерина Васильева</p>
                </div>
            </div>
            <div class="table__row">
                <div class="table__cell">
                    <h1>Название команды</h1>
                    <h5>Название клуба</h5>
                    <p>Екатерина Васильева</p>
                    <p>Екатерина Васильева</p>
                    <p>Екатерина Васильева</p>
                </div>
                <div class="table__cell">
                    <h1>Название команды</h1>
                    <h5>Название клуба</h5>
                    <p>Екатерина Васильева</p>
                    <p>Екатерина Васильева</p>
                    <p>Екатерина Васильева</p>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
  name: 'tab-table'
}
</script>

<style lang="scss" scoped>

    @import '../main.scss';

    .tab-table__wrapper {
        width: 100%;
        max-width: 400px;
        height: 100%;
        margin: 0 auto;
        overflow-y: scroll;

        .table {
            margin: 20px auto;
            display: flex;
            flex-direction: column;
            padding: 5px;
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
                padding-bottom: 10px;

                .table__cell {
                    width: 50%;

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
                    }
                }
            }
        }
    }
</style>
