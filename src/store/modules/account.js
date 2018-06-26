import * as types from '../mutation-types'
import api from '../../services/api'

const state = {
  user: null,
  anotherUser: null,
  checkoutStatus: null
}

// getters
const getters = {
  getUser: state => state.user,
  getAnotherUser: state => state.anotherUser
}

// actions
const actions = {
  getUser ({ commit, state }, credentials = {}) {
    commit(types.ACCOUNT_REQUESTING)
    api.$account.getUser({})
      .then((response) => {
        if (response.data.Success) {
          commit(types.ACCOUNTGET_SUCCESS, response.data)
        } else {
          commit(types.ACCOUNT_FAIL)
        }
      })
      .catch((data) => {
        alert(data)
        commit(types.ACCOUNT_FAIL)
      })
  },
  changeNick ({ commit, state }, credentials = {}) {
    return new Promise((resolve, reject) => {
      commit(types.ACCOUNT_REQUESTING)
      api.$account.changeNick(credentials)
        .then((response) => {
          if (response.data.Success) {
            commit(types.ACCOUNT_SUCCESS, response.data)
            resolve()
          } else {
            commit(types.ACCOUNT_FAIL)
            reject(response.data.Description)
          }
        })
        .catch((data) => {
          commit(types.ACCOUNT_FAIL)
          reject(data)
        })
    })
  },
  changeName ({ commit, state }, credentials = {}) {
    return new Promise((resolve, reject) => {
      commit(types.ACCOUNT_REQUESTING)
      api.$account.changeName(credentials)
        .then((response) => {
          if (response.data.Success) {
            commit(types.ACCOUNT_SUCCESS, response.data)
            resolve()
          } else {
            commit(types.ACCOUNT_FAIL)
            reject(response.data.Description)
          }
        })
        .catch((data) => {
          commit(types.ACCOUNT_FAIL)
          reject(data)
        })
    })
  },
  changeCity ({ commit, state }, credentials = {}) {
    return new Promise((resolve, reject) => {
      commit(types.ANOTHERACCOUNT_REQUESTING)
      api.$account.changeCity(credentials)
        .then((response) => {
          if (response.data.Success) {
            commit(types.ACCOUNT_SUCCESS, response.data)
            resolve()
          } else {
            commit(types.ACCOUNT_FAIL)
            reject(response.data.Description)
          }
        })
        .catch((data) => {
          commit(types.ACCOUNT_FAIL)
          reject(data)
        })
    })
  },
  changeUserAbout ({ commit, state }, credentials = {}) {
    return new Promise((resolve, reject) => {
      commit(types.ACCOUNT_REQUESTING)
      api.$account.changeUserAbout(credentials)
        .then((response) => {
          if (response.data.Success) {
            commit(types.ACCOUNT_SUCCESS, response.data)
            resolve()
          } else {
            commit(types.ACCOUNT_FAIL)
            reject(response.data.Description)
          }
        })
        .catch((data) => {
          commit(types.ACCOUNT_FAIL)
          reject(data)
        })
    })
  },
  changeMessageBan ({ commit, state }, credentials = {}) {
    return new Promise((resolve, reject) => {
      commit(types.ACCOUNT_REQUESTING)
      api.$account.changeMessageBan(credentials)
        .then((response) => {
          if (response.data.Success) {
            commit(types.ACCOUNT_SUCCESS, response.data)
            resolve()
          } else {
            commit(types.ACCOUNT_FAIL)
            reject(response.data.Description)
          }
        })
        .catch((data) => {
          commit(types.ACCOUNT_FAIL)
          reject(data)
        })
    })
  },
  getAnotherUser ({ commit, state }, credentials = {}) {
    console.log(credentials)
    return new Promise((resolve, reject) => {
      commit(types.ACCOUNT_REQUESTING)
      api.$account.getAnotherUser(credentials)
        .then((response) => {
          if (response.data.Success) {
            commit(types.ACCOUNTGETANOTHER_SUCCESS, response.data)
            resolve(response.data)
          } else {
            commit(types.ACCOUNT_FAIL)
            reject(response.data.Description)
          }
        })
        .catch((data) => {
          commit(types.ACCOUNT_FAIL)
          reject(data)
        })
    })
  }
}

// mutations
const mutations = {
  [types.ACCOUNT_REQUESTING] (state) {
    state.checkoutStatus = 'requesting'
  },
  [types.ACCOUNT_REQUESTING] (state) {
    state.anotherUser = {}
    state.checkoutStatus = 'requesting'
  },
  [types.ACCOUNT_FAIL] (state) {
    state.checkoutStatus = null
  },
  [types.ACCOUNTGET_SUCCESS] (state, data) {
    state.checkoutStatus = null
    state.user = data
  },
  [types.ACCOUNT_SUCCESS] (state) {
    state.checkoutStatus = null
  },
  [types.ACCOUNTGETANOTHER_SUCCESS] (state, data) {
    state.checkoutStatus = null
    state.anotherUser = data
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
