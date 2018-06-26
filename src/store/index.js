import Vue from 'vue'
import Vuex from 'vuex'
import * as actions from './actions'
import * as getters from './getters'
import auth from './modules/auth'
import cordova from './modules/cordova'
import account from './modules/account'
import feedback from './modules/feedback'
import message from './modules/message'
import programs from './modules/programs'
import createPersistedState from 'vuex-persistedstate'

Vue.use(Vuex)

export default new Vuex.Store({
  actions,
  getters,
  modules: {
    auth,
    cordova,
    account,
    feedback,
    message,
    programs
  },
  plugins: [createPersistedState()]
})
