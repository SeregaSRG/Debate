import * as types from '../mutation-types'
import api from '../../services/api'

const state = {
  token: null,
  checkoutStatus: false,
  auth: false,
  name: null
}

// getters
const getters = {
  getToken: state => state.token,
  checkLogin: state => state.auth,
  getStatus: state => state.checkoutStatus,
  getName: state => state.name
}

// actions
const actions = {
  login ({ commit, state }, credentials) {
    return new Promise((resolve, reject) => {
      commit(types.AUTH_REQUESTING)
      api.$auth.login(credentials)
        .then((response) => {
          if (response.data.status === 'done') {
            commit(types.AUTH_SUCCESS, response.data.data)
            resolve()
          } else {
            commit(types.AUTH_FAIL)
            reject(response.data.errorcode)
          }
        })
        .catch((data) => {
          commit(types.AUTH_FAIL)
          reject(data)
        })
    })
  },
  checkLogin ({ commit, state }, credentials) {
    return new Promise((resolve, reject) => {
      commit(types.AUTH_REQUESTING)
      api.$auth.checkLogin(credentials)
        .then((response) => {
          if (response.data.status === 'done') {
            commit(types.CHECKLOGIN_SUCCESS)
            resolve()
          } else {
            commit(types.CHECKLOGIN_FAIL)
            reject(response.data.errorcode)
          }
        })
        .catch((data) => {
          commit(types.AUTH_FAIL)
          reject(data)
        })
    })
  },
  /*
  register ({ commit, state }, credentials) {
    return new Promise((resolve, reject) => {
      commit(types.AUTH_REQUESTING)
      api.$auth.register(credentials)
        .then((response) => {
          if (response.data.Success) {
            commit(types.AUTH_SUCCESS, response.data)
            resolve()
          } else {
            commit(types.AUTH_FAIL)
            reject(response.data.Description)
          }
        })
        .catch((data) => {
          commit(types.AUTH_FAIL)
          reject(data)
        })
    })
  },
  */
  logout ({ commit, state }) {
    return new Promise((resolve, reject) => {
      commit(types.AUTH_LOGOUT)
      resolve()
    })
  }
}

// mutations
const mutations = {
  [types.AUTH_REQUESTING] (state) {
    state.checkoutStatus = 'requesting'
  },
  [types.AUTH_FAIL] (state) {
    state.checkoutStatus = false
  },
  [types.AUTH_SUCCESS] (state, data) {
    state.token = data.token
    state.auth = true
    state.name = data.login
    state.checkoutStatus = false
  },
  [types.CHECKLOGIN_FAIL] (state) {
    state.checkoutStatus = false
    state.token = null
    state.auth = false
    state.name = null
  },
  [types.CHECKLOGIN_SUCCESS] (state) {
    state.auth = true
    state.checkoutStatus = false
  },
  [types.AUTH_LOGOUT] (state) {
    state.token = null
    state.auth = false
    state.name = null
    state.checkoutStatus = false
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
