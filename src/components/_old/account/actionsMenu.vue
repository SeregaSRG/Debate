<template>
    <transition name="openBottom">
        <div class="actionsMenu shadow-block">
            <h3 class="closeButton noselect" @click="closeMe">ЗАКРЫТЬ</h3>
            <div class="input_wrapper">
                <p @click="sendMe">Ответить {{ messageInfo.UserName }}</p>
                <p @click="deleteMe">Удалить сообщение</p>
                <p @click="deleteMe">Пожаловаться</p>
            </div>
        </div>
    </transition>
</template>
<script>
export default {
  name: 'actionsMenu',
  props: ['messageInfo'],
  data () {
    return {}
  },
  methods: {
    sendMe: function () {
      this.$emit('sendMe', this.messageInfo.UserName)
    },
    closeMe: function () {
      this.$emit('closeMe')
    },
    deleteMe: function () {
      this.$emit('deleteMe', this.messageInfo.Id)
    }
  }
}
</script>

<style lang="scss" scoped>
    @import '../../main.scss';

    .actionsMenu {
        width: 100vw;
        height: 200px;
        position: absolute;
        z-index: 100;
        background-color: $background_module-color;
        bottom: 0;
        left: 0;
        overflow-y: scroll;

        .closeButton {
            position: absolute;
            top: 20px;
            right: 20px;
            color: $secondary-color;
            font-size: 12px;
        }

        .input_wrapper {
            padding-top: 55px;
            width: 300px;
            margin: 0 auto;

            p {
                color: $text-color;
                height: 40px;
                padding-left: 25px;
                position: relative;

                &:before {
                    content: '';
                    position: absolute;
                    top: -1px;
                    left: 0;
                    color: $secondary-color;
                }
            }

            p:nth-child(1):before {
                content: '⤷'!important;
                top: 1px;
            }
            p:nth-child(2):before {
                content: '✘'!important;
                top: -3px;
            }
            p:nth-child(3):before {
                content: '⚠'!important;
                top: -3px;
            }
        }
    }

    .openBottom-enter-active, .openBottom-leave-active {
        transition: transform .5s;
    }
    .openBottom-enter {
        transform: translateY(300px);
    }
    .openBottom-leave-to {
        transform: translateY(300px);
    }
</style>
