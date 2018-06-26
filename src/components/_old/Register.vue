<template>
    <div class="Register">
        <div class="register_wrapper">
            <div class="menu_wrapper">
                <h3 v-on:click="activeTab = 'register'">Регистрация</h3>
                <h3 v-on:click="activeTab = 'login'">Вход</h3>
                <div class="active-tab__line" v-bind:class="{register: activeTab==='register', login: activeTab==='login'}"></div>
            </div>
            <transition :name="activeTab">
                <div class="input_wrapper__register" v-if="activeTab==='register'" key="register">
                    <transition-group name="fade" appear>
                        <input type="text" name="name" placeholder="Ник" key="1" v-model="objForRegister.NickName">
                        <input type="Email" name="name" placeholder="Email" key="2" v-model="objForRegister.Email">
                        <input type="text" name="name" placeholder="Город" key="3" v-model="objForRegister.City">
                        <input type="Password" name="name" placeholder="Пароль" key="4" v-model="objForRegister.Password">
                        <input type="Password" name="name" placeholder="Повторение пароля"
                               key="5"
                               v-model="objForRegister.PasswordRepeat"
                               v-bind:class="{'incorrect-input': objForRegister.Password!==objForRegister.PasswordRepeat && objForRegister.Password!==''}"
                        >
                        <div class="gender-select" key="6">
                            <div class="gender-select--button gender-select--button__left" v-bind:class="{'gender-select--button__active': objForRegister.Sex==='1'}" v-on:click="objForRegister.Sex = '1'">
                                <p>Мужской</p>
                            </div>
                            <div class="gender-select--button gender-select--button__right" v-bind:class="{'gender-select--button__active': objForRegister.Sex==='2'}" v-on:click="objForRegister.Sex = '2'">
                                <p>Женский</p>
                            </div>
                        </div>
                    </transition-group>
                    <p class="error-text">{{ errorText }}</p>
                        <transition name="fade">
                            <div class="next-button"
                                 v-if="isRegisterCompleted"
                                 @click="register()"
                            >
                                <p v-if="!status">Зарегистрироваться</p>
                                <p v-if="status">Выполняется запрос..</p>
                            </div>
                        </transition>
                </div>
                <div class="input_wrapper__login"  v-if="activeTab==='login'" key="login">
                    <input type="Email" name="name" placeholder="Email" v-model="objForLogin.Email">
                    <input type="Password" name="name" placeholder="Пароль" v-model="objForLogin.Password">
                    <p class="error-text">{{ errorText }}</p>
                    <transition name="fade">
                        <div class="next-button" v-if="isLoginComleted" @click="login()">
                            <transition name="fade">
                                <p v-if="!status">Войти</p>
                                <p v-else>Выполняется запрос..</p>
                            </transition>
                        </div>
                    </transition>
                </div>
            </transition>
        </div>
    </div>
</template>

<script>

export default {
  name: 'Register',
  data () {
    return {
      objForLogin: {
        Email: '',
        Password: ''
      },
      objForRegister: {
        Sex: '1',
        NickName: '',
        Email: '',
        City: '',
        Password: '',
        PasswordRepeat: ''
      },
      activeTab: 'register',
      errorText: ''
    }
  },
  methods: {
    login () {
      this.$store.dispatch('auth/login', this.objForLogin)
        .then(() => {
          if (this.$store.getters['auth/checkLogin']) {
            this.$router.push('programs')
          }
        })
        .catch((data) => {
          console.log(data)
          this.errorText = data
        })
    },
    register () {
      this.$store.dispatch('auth/register', this.objForRegister)
        .then(() => {
          if (this.$store.getters['auth/checkLogin']) {
            this.$router.push('programs')
          }
        })
        .catch((data) => {
          console.log(data)
          this.errorText = data
        })
    }
  },
  computed: {
    status: function () {
      return this.$store.getters['auth/getStatus']
    },
    isRegisterCompleted: function () {
      return this.objForRegister.Password === this.objForRegister.PasswordRepeat && this.objForRegister.Password !== '' && this.objForRegister.NickName !== '' && this.objForRegister.Email !== ''
    },
    isLoginComleted: function () {
      return this.objForLogin.Email !== '' && this.objForLogin.Password !== ''
    }
  },
  beforeCreate: function () {
    if (this.$store.getters['auth/checkLogin']) {
      this.$router.push('programs')
    }
  }
}
</script>

<style lang="scss" scoped>
@import '../main.scss';
.Register {
    width: 100vw;
    height: 100vh;
    background-color: $background_module-color;
    z-index: 100;
    position: relative;
    overflow-y: scroll;

    .register_wrapper {
        width: 300px;
        margin: 0 auto;
        padding-top: 100px;
        color: $text-color;
        position: relative;

        .menu_wrapper {
            display: flex;
            flex-direction: row;
            margin-bottom: 30px;
            justify-content: space-between;
            width: 200px;
            position: relative;

            h3 {
                position: relative;
                font-weight: 100;
                user-select: none;
            }

            .active-tab__line {
                height: 1px;
                background-color: $accent-color;
                position: absolute;
                bottom: -2px;
                transition: .5s $cubic_bezier;
                &.register {
                    width: 117px;
                    left: 0;
                }
                &.login {
                    width: 46px;
                    transform: translateX(156px);
                }
            }
        }

        .input_wrapper__register {
            position: absolute;
            padding-bottom: 80px;
            @include waterfall(10, .1, fade);

            .gender-select {
                margin-top: 20px;
                height: 40px;
                width: 100%;
                background-color: transparent;
                border-radius: 20px;
                display: flex;
                cursor: pointer;
                user-select: none;

                &:active, &:focus {
                    outline: none;
                }

                &::-moz-focus-inner {
                    border: 0;
                }

                .gender-select--button {
                    width: 50%;
                    display: flex;
                    border: 1px solid $secondary-color;

                    p {
                        margin: auto;
                    }
                }

                .gender-select--button__left {
                    border-radius: 20px 0 0 20px;
                    border-right: none;
                }

                .gender-select--button__right {
                    border-radius: 0 20px 20px 0;
                    border-left: none;
                }

                .gender-select--button__active {
                    border: 1px solid $accent-color;
                    color: $accent-color;
                }
            }
        }

        .input_wrapper__login {
            position: absolute;
            padding-bottom: 80px;
            @include waterfall(3, .1, fade);
        }
    }
}

.fade-enter-active, .fade-leave-active {
    transition: opacity .5s;
}
.fade-enter, .fade-leave-to {
    opaCity: 0;
}

.register-enter-active, .register-leave-active, .login-enter-active, .login-leave-active {
    transition: transform .5s;
}
.register-enter {
    transform: translateX(-100vw);
}

.register-leave-to {
    transform: translateX(100vw);
}
.login-enter {
    transform: translateX(100vw);
}

.login-leave-to {
    transform: translateX(-100vw);
}
</style>
