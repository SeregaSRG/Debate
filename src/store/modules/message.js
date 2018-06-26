import * as types from '../mutation-types'
import api from '../../services/api'

const state = {
  messages: [],
  currentPage: 1,
  usersByFind: [],
  checkoutStatus: null
}

// getters
const getters = {
  getMessages: state => state.messages,
  getStatus: state => state.checkoutStatus,
  getUsersByFind: state => state.usersByFind
}

// actions
const actions = {
  getMessages ({ commit, state }, credentials = {}) {
    return new Promise((resolve, reject) => {
      commit(types.MESSAGES_REQUESTING)
      credentials.Page = state.currentPage
      api.$message.getMessages(credentials)
        .then((response) => {
          if (response.data.Success) {
            commit(types.MESSAGES_SUCCESS, response.data)
            resolve()
          } else {
            commit(types.MESSAGES_FAIL)
            reject(response.data.Description)
          }
        })
        .catch((data) => {
          commit(types.MESSAGES_FAIL)
          reject(data)
        })
    })
  },
  searchUsers ({ commit, state }, credentials = {}) {
    return new Promise((resolve, reject) => {
      // commit(types.MESSAGES_REQUESTING)
      api.$message.searchUsers(credentials)
        .then((response) => {
          if (response.data.Success) {
            commit(types.USERSEARCH_SUCCESS, response.data)
            resolve()
          } else {
            commit(types.MESSAGES_FAIL)
            reject(response.data.Description)
          }
        })
        .catch((data) => {
          commit(types.MESSAGES_FAIL)
          reject(data)
        })
    })
  },
  removeMessage ({ commit, state }, credentials = {}) {
    console.log(credentials)
    return new Promise((resolve, reject) => {
      // commit(types.MESSAGES_REQUESTING)
      api.$message.removeMessage(credentials)
        .then((response) => {
          if (response.data.Success) {
            resolve()
          } else {
            commit(types.MESSAGES_FAIL)
            reject(response.data.Description)
          }
        })
        .catch((data) => {
          commit(types.MESSAGES_FAIL)
          reject(data)
        })
    })
  }
}

// mutations
const mutations = {
  [types.MESSAGES_REQUESTING] (state) {
    state.checkoutStatus = 'requesting'
  },
  [types.MESSAGES_FAIL] (state) {
    state.checkoutStatus = null
  },
  [types.MESSAGES_SUCCESS] (state, data) {
    state.messages = data.Messages.reverse()
    state.checkoutStatus = null
  },
  [types.USERSEARCH_SUCCESS] (state, data) {
    state.usersByFind = data.Users
    state.checkoutStatus = null
  },
  [types.USERSEARCH_CLEAN] (state) {
    state.usersByFind = []
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
