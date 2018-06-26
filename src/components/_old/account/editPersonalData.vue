<template>
    <transition name="openBottom">
        <div class="editPersonalData">
            <h3 class="closeButton noselect" @click="close">ЗАКРЫТЬ</h3>
            <div class="input_wrapper">
                <input type="text" name="name" placeholder="Ник" v-model="user.NickName">
                <input type="text" name="name" placeholder="Имя" v-model="user.FullName">
                <input type="text" name="name" placeholder="Город" v-model="user.City">
                <textarea rows="3" name="name" placeholder="О себе" v-model="user.UserAbout"></textarea>
                <p class="titleMessage">Входящие сообщения от пользователей:</p>
                <div class="privacy-select">
                    <div class="privacy-select--button privacy-select--button__left" v-bind:class="{'privacy-select--button__active': user.MessageBan===true}" v-on:click="user.MessageBan = true">
                        <p>Запретить</p>
                    </div>
                    <div class="privacy-select--button privacy-select--button__right" v-bind:class="{'privacy-select--button__active': user.MessageBan===false}" v-on:click="user.MessageBan = false">
                        <p>Разрешить</p>
                    </div>
                </div>
                <div class="save-button noselect" @click="sendChanges()">
                    <p>Сохранить</p>
                </div>
            </div>
        </div>
    </transition>
</template>

<script>
export default {
  name: 'edit-personal-data',
  props: ['user'],
  data () {
    return {
    }
  },
  methods: {
    sendChanges () {
      this.$store.dispatch('account/changeNick', {
        'NewData': this.user.NickName
      })
      this.$store.dispatch('account/changeName', {
        'NewData': this.user.FullName
      })
      this.$store.dispatch('account/changeCity', {
        'NewData': this.user.City
      })
      this.$store.dispatch('account/changeUserAbout', {
        'NewData': this.user.UserAbout
      })
      this.$store.dispatch('account/changeMessageBan', {
        'NewData': this.user.MessageBan
      })
      this.$emit('closeMe')
    },
    close: function () {
      this.$emit('closeMe')
    }
  }
}
</script>

<style lang="scss" scoped>
    @import '../../main.scss';

    .editPersonalData {
        width: 100vw;
        height: 100vh;
        position: absolute;
        z-index: 100;
        background-color: $background_module-color;
        bottom: 0;
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
        }

        p.titleMessage {
            color: $secondary-color;
            font-size: 15px;
            text-align: center;
        }

        .privacy-select {
            margin-top: 20px;
            height: 40px;
            width: 100%;
            background-color: transparent;
            border-radius: 20px;
            display: flex;
            cursor: pointer;
            user-select: none;

            &:active, &:focus, &:hover {
                outline: none;
                outline: 0;
                outline-offset: 0;
            }

            &::-moz-focus-inner {
                border: 0;
            }

            .privacy-select--button {
                width: 50%;
                display: flex;
                border: 1px solid $secondary-color;

                p {
                    margin: auto;
                    color: $secondary-color
                }
            }

            .privacy-select--button__left {
                border-radius: 20px 0 0 20px;
                border-right: none;
            }

            .privacy-select--button__right {
                border-radius: 0 20px 20px 0;
                border-left: none;
            }

            .privacy-select--button__active {
                border: 1px solid $accent-color;
                p {
                    color: $accent-color !important;
                }
            }
        }

        .save-button {
            transition: all .2s;
            width: 100%;
            height: 48px;
            margin: 40px auto;
            border: 1px solid $accent-color;
            display: flex;
            border-radius: 12px;
            color: $accent-color;

            p {
                margin: auto;
            }
        }
    }

    .openBottom-enter-active, .openBottom-leave-active {
        transition: transform .5s;
    }
    .openBottom-enter {
        transform: translateY(100vh);
    }
    .openBottom-leave-to {
        transform: translateY(100vh);
    }
</style>
