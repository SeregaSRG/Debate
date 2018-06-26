import * as types from '../mutation-types'
import api from '../../services/api'

const state = {
  programs: {}
}

// getters
const getters = {
  getPrograms: state => state.programs,
  getProgram: state => id => state.programs[id],
  getDays: state => id => state.programs[id].trainingDays
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
  }
}

// mutations
const mutations = {
  [types.CREATE_PROGRAM] (state, data) {
    console.log(data.localId)
    state.programs[data.localId] = data.program
  },
  [types.DELETEALL_PROGRAMS] (state) {
    state.programs = {}
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
