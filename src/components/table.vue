<template>
    <div class="table__wrapper">
        <div class="control__wrapper">
            <div class="control__league">
                <router-link :to="'/table/k/' + round" class="control__button"><p>КП</p></router-link>
                <router-link :to="'/table/v/' + round" class="control__button"><p>ВШФ</p></router-link>
                <router-link :to="'/table/b/' + round" class="control__button"><p>БПФ</p></router-link>
                <router-link :to="'/table/e/' + round" class="control__button"><p>EN</p></router-link>
                <div class="active-bubble"></div>
            </div>
            <div class="control__round">
                <router-link :to="league + '1'" class="control__button"><p>1</p></router-link>
                <router-link :to="league + '2'" class="control__button"><p>2</p></router-link>
                <router-link :to="league + '3'" class="control__button"><p>3</p></router-link>
                <router-link :to="league + '4'" class="control__button"><p>4</p></router-link>
                <router-link :to="league + '5'" class="control__button"><p>5 </p></router-link>
                <div class="active-bubble"></div>
            </div>
        </div>
        <router-view></router-view>
    </div>
</template>

<script>
export default {
  name: 'auth',
  computed: {
    league: function () {
      return this.$route.path.slice(0, -1)
    },
    round: function () {
      return this.$route.path.slice(-1)
    }
  }
}
</script>

<style lang="scss" scoped>

    @import '../main.scss';

    .table__wrapper {
        width: 100%;
        height: 100%;
        position: absolute;
    }

    .control__wrapper {
        width: 100%;
        height: 150px;
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
