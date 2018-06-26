<template>
    <transition name="openBottom">
        <div class="message-field shadow-block">
            <h3 class="closeButton noselect" @click="close">ЗАКРЫТЬ</h3>
            <div class="input_wrapper">
                <input class="to" placeholder="Кому.." v-model="messageTo">
                <textarea class="text" placeholder="Сообщение.." v-model="messageText" rows="8"></textarea>
                <div class="send-button noselect" @click="sendMessage">
                    <p v-if="status === null">Отправить</p>
                    <p v-if="status === 'sending'">Отправление..</p>
                </div>
            </div>
        </div>
    </transition>
</template>

<script>
import api from '../../services/api'
export default {
  name: 'message-field',
  props: ['messageInfo'],
  data () {
    return {
      messageTo: this.messageInfo.UserName,
      messageText: '',
      status: null
    }
  },
  methods: {
    close: function () {
      this.$emit('closeMe')
    },
    sendMessage: function () {
      this.status = 'sending'
      api.$message.sendMessage({
        ToNickName: this.messageTo,
        text: this.messageText
      })
        .then((response) => {
          this.status = null
          if (response.data.Success) {
            this.close()
          } else {
            alert(response.data.Description)
            this.close()
          }
        })
        .catch((data) => {
          this.status = null
          alert(data)
          this.close()
        })
    }
  }
}
</script>

<style lang="scss" scoped>
    @import '../../main.scss';

    .message-field {
        width: 100vw;
        height: 60vh;
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
        }

        .send-button {
            transition: all .2s;
            width: 100%;
            height: 48px;
            margin: 0px auto;
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
        transform: translateY(60vh);
    }
    .openBottom-leave-to {
        transform: translateY(60vh);
    }
</style>
