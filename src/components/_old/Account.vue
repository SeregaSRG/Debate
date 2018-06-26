<template>
  <transition name="fade">
    <div class="account">
      <div class="account_wrapper">
        <div class="avatar">
        </div>
        <div class="user_wrapper">
          <div class="name_wrapper"
            @click="clean"
          >
            <h1>{{ user.NickName }}</h1>
            <h2>{{ user.Email }}</h2>
            <h2>{{ user.FullName }}</h2>
          </div>
          <div class="control_wrapper">
            <h3 class="noselect" @click="isEditPersonalDataOpen = true">РЕДАКТИРОВАТЬ</h3>
            <h3 class="noselect" @click="logout()">ВЫЙТИ</h3>
          </div>
        </div>
      </div>
      <div class="select-tab">
        <router-link class="select-tab__button select-tab__left" to="/account/messages">
          <p>Сообщения</p>
        </router-link>
        <router-link class="select-tab__button select-tab__right" to="/account/feedback">
          <p>Вопросы</p>
        </router-link>
      </div>
      <router-view @scrollToMe="scrollToMe"></router-view>
      <message-field
              v-if="isMessageFieldOpen"
              @closeMe="isMessageFieldOpen = false"
      ></message-field>
      <edit-personal-data
              v-if="isEditPersonalDataOpen"
              :user="user"
              @closeMe="isEditPersonalDataOpen = false"
      ></edit-personal-data>
    </div>
  </transition>
</template>

<script>
export default {
  name: 'Account',
  components: {
    'MessageField': () => import('./account/messageField'),
    'editPersonalData': () => import('./account/editPersonalData.vue')
  },
  data () {
    return {
      isEditPersonalDataOpen: false,
      privacy: true,
      isMessageFieldOpen: false
    }
  },
  methods: {
    logout () {
      this.$store.dispatch('auth/logout')
        .then(() => {
          if (!this.$store.getters['auth/checkLogin']) {
            this.$router.push('/')
          }
        })
    },
    scrollToMe: function (offsetTop) {
      console.log(this.$el)
      setTimeout(() => {
        this.$el.scrollTop = offsetTop + 10
      }, 350)
    },
    clean: function () {
      this.$store.commit('programs/DELETEALL_PROGRAMS')
    }
  },
  computed: {
    user: function () {
      return this.$store.getters['account/getUser']
    }
  },
  beforeCreate: function () {
    this.$store.dispatch('account/getUser')
  }
}
</script>

<style lang="scss" scoped>
  @import '../main.scss';
  .account {
    width: 100vw;
    height: 100vh;
    padding-top: 5.5vw;
    padding-bottom: calc(100vw / 6.25);
    z-index: 1;
    overflow-y: scroll;
  }

  .account_wrapper {
    position: relative;
    width: 310px;
    height: auto;
    margin: 0 auto;
    display: flex;
    flex-direction: row;
    justify-content: space-between;

    .avatar {
      width: 80px;
      height: 80px;
      border-radius: 40px;
      background-color: #2f9aac;
    }

    .user_wrapper {
      width: 200px;
      display: flex;
      flex-direction: column;
      justify-content: space-around;

      .name_wrapper {
        display: flex;
        flex-direction: column;
        color: $text-color;
        font-size: 10px;
      }

      .control_wrapper {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        color: $secondary-color;
        font-size: 10px;
      }
    }
  }

  .select-tab {
    margin-top: 40px;
  }

  .openBottom-enter-active, .openBottom-leave-active {
    transition: transform .5s $cubic_bezier;
  }
  .openBottom-enter {
    transform: translateY(100vh);
  }
  .openBottom-leave-to {
    transform: translateY(100vh);
  }
</style>
