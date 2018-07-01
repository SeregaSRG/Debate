<template>
    <div class="admin__wrapper">
        <div class="control__wrapper hidden-print">
            <div class="control__type">
                <router-link to="/admin/speakers" class="control__button"><p>Спикеры</p></router-link>
                <router-link to="/admin/teams" class="control__button"><p>Команды</p></router-link>
                <router-link to="/admin/judges" class="control__button"><p>Судьи</p></router-link>
                <router-link to="/admin/tabs" class="control__button"><p>ТЭБ</p></router-link>
                <div class="active-bubble"></div>
            </div>
        </div>
        <router-view></router-view>
    </div>
</template>

<script>
export default {
  name: 'admin',
  created: function () {
    if (this.$route.path === '/admin/' || this.$route.path === '/admin') {
      this.$router.push('/admin/speakers')
    }
  }
}
</script>

<style lang="scss" scoped>
    @import '../main.scss';

    .admin__wrapper {
        width: 100%;
        height: 100%;
        overflow-y: scroll;
    }

    .control__wrapper {
        width: 100%;
        height: 100px;
        margin: 0 auto;
        display: flex;
        justify-content: space-evenly;
        flex-direction: column;
        align-items: center;
        background: linear-gradient(to right, #30AAFF, #2BD0FF);

        .control__type {
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

        .control__type {
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
    }
</style>
