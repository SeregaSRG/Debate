<template>
    <div class="Messages" id="messages">
        <!-- <transition name="fade">
            <preloader v-if="isLoaded"></preloader>
        </transition> -->
        <div class="new-message shadow-block" v-on:click="openFind">
            <p v-if="!isOpened.find">Новое сообщение</p>
            <div class="user-find" v-if="isOpened.find">
                <input placeholder="Кому написать.." v-model="findField.NickName" @keyup="findByNick" @focus="openFind">
                <div
                        class="user-find__item shadow-block"
                        v-for="item of usersByFind"
                        :key="item"
                        @click="openSendMessage({UserName: item})"
                >{{ item }}</div>
            </div>
        </div>
        <transition-group name="fade" appear>
            <div class="message shadow-block" v-for="message in messages" :key="message.Id">
                <div class="message__left">
                    <div class="message__avatar"
                         @click="openAnotherAccount(message)"
                    ></div>
                    <div class="message__more"
                         @click="openActionMenu(message)"
                    >
                        <p>•••</p>
                    </div>
                </div>
                <div class="message__container">
                    <div class="message__wrapper"
                         @click="openAnotherAccount(message)"
                    >
                        <div class="message__name">{{ message.UserName }}</div>
                        <div class="message__date">{{ message.Date }}</div>
                    </div>
                    <div class="message__text"
                         @click="openActionMenu(message)"
                    >
                        {{ message.Text }}
                    </div>
                </div>
            </div>
        </transition-group>
        <actions-menu
                :messageInfo="messageInfo"
                v-if="isOpened.actionMenu"
                @closeMe="isOpened.actionMenu = false"
                @deleteMe="deleteMessage"
                @sendMe="openSendMessage(messageInfo)"
        ></actions-menu>
        <another-account
                :messageInfo="messageInfo"
                v-if="isOpened.anotherAccount"
                @closeMe="isOpened.anotherAccount = false"
        ></another-account>
        <message-field
                :messageInfo="messageInfo"
                v-if="isOpened.messageField"
                @closeMe="isOpened.messageField = false"
        ></message-field>
    </div>
</template>

<script>
export default {
  name: 'Messages',
  components: {
    'preloader': () => import('../preloader.vue'),
    'actions-menu': () => import('./actionsMenu.vue'),
    'message-field': () => import('./messageField.vue'),
    'another-account': () => import('./anotherAccount.vue')
  },
  data () {
    return {
      isOpened: {
        find: false,
        actionMenu: false,
        messageField: false,
        anotherAccount: false
      },
      findField: {},
      messageInfo: {},
      timer: function () {}
    }
  },
  methods: {
    findByNick: function (e) {
      clearTimeout(this.timer)
      this.timer = setTimeout(() => {
        this.$store.dispatch('message/searchUsers', this.findField)
          .then(() => {
          })
          .catch((data) => {
            if (data === 'Пользователи не найдены.') {
              this.findField.NickName = ''
              this.$store.commit('message/USERSEARCH_CLEAN')
              alert('Пользователь с таким ником не найден')
            }
          })
      }, 400)
    },
    openActionMenu: function (message) {
      this.isOpened.anotherAccount = false
      this.isOpened.actionMenu = true
      this.messageInfo = message
    },
    deleteMessage: function (id) {
      this.$store.dispatch('message/removeMessage', {MessageId: id})
        .then(() => {
          console.log('Сообщение удалено')
          this.$store.dispatch('message/getMessages')
          this.isOpened.actionMenu = false
        })
        .catch((data) => {
          alert(data)
        })
    },
    openAnotherAccount: function (message) {
      this.isOpened.actionMenu = false
      this.isOpened.anotherAccount = true
      this.messageInfo = message
    },
    openFind: function () {
      this.isOpened.find = true
      this.$emit('scrollToMe', this.$el.offsetTop)
    },
    openSendMessage: function (message) {
      if (message) {
        this.messageInfo = message
      }
      this.isOpened.messageField = true
      this.isOpened.actionMenu = false
      this.isOpened.anotherAccount = false
    }
  },
  computed: {
    messages: function () {
      return this.$store.getters['message/getMessages']
    },
    isLoaded: function () {
      return this.$store.getters['message/getStatus']
    },
    usersByFind: function () {
      return this.$store.getters['message/getUsersByFind']
    }
  },
  beforeCreate: function () {
    this.$store.commit('message/USERSEARCH_CLEAN')
    this.$store.dispatch('message/getMessages')
  }
}
</script>

<style lang="scss" scoped>
    @import '../../main.scss';
    .Messages {
        width: 310px;
        height: auto;
        margin: 10px auto;
        color: $text-color;
        @include waterfall(15, .1, fade);

        .message {
            margin-top: 12px;
            width: 100%;
            padding: 10px;
            display: flex;
            flex-direction: row;
            background-color: $background_module-color;
            border-radius: 15px;

            .message__avatar {
                width: 40px;
                height: 40px;
                background-color: $accent-color;
                border-radius: 20px;
            }

            .message__more {
                display: flex;
                min-height: 20px;
                p {
                    height: 5px;
                    margin: auto;
                    text-align: center;
                    color: $secondary-color;
                }
            }

            .message__container {
                width: 250px;
                padding-left: 10px;

                .message__wrapper {
                    display: flex;
                    flex-direction: row;
                    justify-content: space-between;

                    .message__name {
                        font-size: 14px;
                    }
                    .message__date {
                        font-size: 12px;
                        color: $secondary-color;
                    }
                }

                .message__text {
                    padding-top: 10px;
                    font-size: 13px;
                }
            }
        }
    }

    .new-message {
        margin-top: 12px;
        width: 100%;
        min-height: 51px;
        padding: 10px;
        display: flex;
        background-color: $background_module-color;
        border-radius: 15px;

        p {
            margin: auto;
        }

        .user-find {
            width: 100%;
            background-color: $background_module-color;
            padding: 10px;
            border-radius: 6px;

            input {
                margin: 10px 0;
            }
            .user-find__item {
                position: relative;
                width: 100%;
                padding: 8px;
                margin-bottom: 4px;
                position: relative;
                color: $text-color;
                border-radius: 4px;
                background-color: $background_module__light-color;

                &:after {
                    content: '↪';
                    position: absolute;
                    right: 10px;
                    top: 8px;
                }
            }
        }
    }
</style>
