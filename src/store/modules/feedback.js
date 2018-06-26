import * as types from '../mutation-types'
import api from '../../services/api'

const state = {
  questions: [],
  currentPage: 1
}

// getters
const getters = {
  getQuestions: state => state.questions
}

// actions
const actions = {
  getQuestions ({ commit, state }, credentials = {}) {
    return new Promise((resolve, reject) => {
      commit(types.QUESTIONS_REQUESTING)
      credentials.Page = state.currentPage
      api.$feedback.getQuestions(credentials)
        .then((response) => {
          if (response.data.Success) {
            commit(types.QUESTIONS_SUCCESS, response.data)
            resolve()
          } else {
            commit(types.QUESTIONS_FAIL)
            reject(response.data.Description)
          }
        })
        .catch((data) => {
          commit(types.QUESTIONS_FAIL)
          reject(data)
        })
    })
  }
}

// mutations
const mutations = {
  [types.QUESTIONS_REQUESTING] (state) {
    state.checkoutStatus = 'requesting'
  },
  [types.QUESTIONS_FAIL] (state) {
    state.checkoutStatus = null
  },
  [types.QUESTIONS_SUCCESS] (state, data) {
    state.questions = data.Questions
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
