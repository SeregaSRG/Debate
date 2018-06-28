<template>
    <div class="account__wrapper">
        <div class="account__button">
            <router-link :to="'/auth'" v-if="!isLogin">ВОЙТИ</router-link>
            <p v-if="isLogin">{{ name }}</p>
        </div>
    </div>
</template>

<script>
export default {
  name: 'account',
  data () {
    return {
      name: 'Имя фамилия',
      isLogin: false
    }
  }
}
</script>

<style lang="scss" scoped>
.account__wrapper {
    width: 300px;
    display: flex;
    flex-direction: column;
    align-items: flex-end;

    .account__button {
        cursor: pointer;
        a, p {
            color: black;
            font-size: 14px;
        }
    }
}
</style>
