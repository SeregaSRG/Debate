import * as types from '../mutation-types'
import api from '../../services/api'

const state = {
  token: null,
  checkoutStatus: null,
  auth: false
}

// getters
const getters = {
  getToken: state => state.token,
  checkLogin: state => state.auth,
  getStatus: state => state.checkoutStatus
}

// actions
const actions = {
  login ({ commit, state }, credentials) {
    return new Promise((resolve, reject) => {
      commit(types.AUTH_REQUESTING)
      api.$auth.login(credentials)
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
  logout ({ commit, state }) {
    return new Promise((resolve, reject) => {
      commit(types.AUTH_REQUESTING)
      api.$auth.logout({})
        .then((response) => {
          if (response.data.Success) {
            commit(types.AUTH_LOGOUT)
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
  }
}

// mutations
const mutations = {
  [types.AUTH_REQUESTING] (state) {
    state.checkoutStatus = 'requesting'
  },
  [types.AUTH_FAIL] (state) {
    state.checkoutStatus = null
  },
  [types.AUTH_SUCCESS] (state, data) {
    state.token = data.Description
    state.auth = true
    state.checkoutStatus = null
  },
  [types.AUTH_LOGOUT] (state) {
    state.token = null
    state.auth = false
    state.checkoutStatus = null
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
