<template>
    <div class="auth__wrapper">
        <div class="decoration"></div>
        <div class="auth__card shadow-block">
            <input class="auth__login" type="text" placeholder="Фамилия">
            <input class="auth__password" type="tel" placeholder="Пароль">
            <div class="auth__button"><p>ВОЙТИ</p></div>
        </div>
    </div>
</template>

<script>
export default {
  name: 'auth'
}
</script>

<style lang="scss" scoped>

    @import '../main.scss';

    .auth__wrapper {
        width: 100%;
        height: 100%;
        position: absolute;

        .decoration {
            width: 100%;
            height: 33%;
            background: linear-gradient(to right, #30AAFF, #2BD0FF);
            position: absolute;
            z-index: -1;
        }

        .auth__card {
            width: 90%;
            max-width: 400px;
            margin: 22vh auto 0 auto;
            background-color: $background-color;
            border-radius: 10px;
            padding: 30px;
        }

        .auth__button {
            @extend .oval-button;
        }
}
</style>
