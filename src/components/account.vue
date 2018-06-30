<template>
    <div class="account__wrapper">
        <div class="account__button" v-if="isLogin && (name==='Админ')">
            <router-link :to="'/admin'">УПРАВЛЕНИЕ</router-link>
        </div>
        <div class="account__button" v-if="isLogin && !(name==='Админ')">
            <router-link :to="'/admin'">СУДЕЙСТВО</router-link>
        </div>
        <div class="account__button">
            <router-link :to="'/auth'" v-if="!isLogin">ВОЙТИ</router-link>
            <p v-if="isLogin" @click="logout">{{ name }}</p>
        </div>
    </div>
</template>

<script>
export default {
  name: 'account',
  data () {
    return {
    }
  },
  methods: {
    logout: function () {
      this.$store.dispatch('auth/logout')
        .then(() => {
          if (!this.$store.getters['auth/checkLogin']) {
            this.$router.push('/auth')
          }
        })
    }
  },
  computed: {
    isLogin: function () {
      return this.$store.getters['auth/checkLogin']
    },
    name: function () {
      return this.$store.getters['auth/getName']
    }
  }
}
</script>

<style lang="scss" scoped>
.account__wrapper {
    width: 300px;
    display: flex;
    flex-direction: row;
    justify-content: space-between;

    .account__button {
        cursor: pointer;
        a, p {
            color: black;
            font-size: 14px;
        }
    }
}
</style>
