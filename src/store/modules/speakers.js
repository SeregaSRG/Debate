import * as types from '../mutation-types'
import api from '../../services/api'

const state = {
  speakers: [
    {
      name: 'Имя',
      surname: 'Фамилия',
      team: 'Команда',
      club: 'Клуб',
      league: 'Лига'
    }
  ]
}

// getters
const getters = {
  getSpeakers: state => state.speakers,
  getTeams: state => {
    let result = {}
    state.speakers.forEach(function (item, i, arr) {
      if (result[item.team] === undefined) {
        result[item.team] = []
        result[item.team].push(item)
      } else {
        result[item.team].push(item)
      }
    })
    return result
  }
}

// actions
const actions = {
  getSpeakers ({ commit, state }, credentials = {}) {
    state.speakers = credentials.speakers
    /*
    return new Promise((resolve, reject) => {
      commit(types.SPEAKERS_REQUESTING)
      api.$speakers.getSpeakers(credentials)
        .then((response) => {
          if (response.data.status === 'done') {
            commit(types.SPEAKERS_SUCCESS, response.data.data)
            resolve()
          } else {
            commit(types.SPEAKERS_FAIL)
            reject(response.data.errorcode)
          }
        })
        .catch((data) => {
          commit(types.SPEAKERS_FAIL)
          reject(data)
        })
    })
      */
  },
  saveSpeakers ({ commit, state }, credentials = {}) {
    return new Promise((resolve, reject) => {
      commit(types.SPEAKERS_REQUESTING)
      credentials.Page = state.currentPage
      api.$speakers.getSpeakers(credentials)
        .then((response) => {
          if (response.data.status === 'done') {
            commit(types.SPEAKERS_SUCCESS, response.data.data)
            resolve()
          } else {
            commit(types.SPEAKERS_FAIL)
            reject(response.data.errorcode)
          }
        })
        .catch((data) => {
          commit(types.SPEAKERS_FAIL)
          reject(data)
        })
    })
  }
}

// mutations
const mutations = {
  [types.SPEAKERS_REQUESTING] (state) {
    state.checkoutStatus = 'requesting'
  },
  [types.SPEAKERS_FAIL] (state) {
    state.checkoutStatus = null
  },
  [types.SPEAKERS_SUCCESS] (state, data) {
    state.checkoutStatus = null
    state.SPEAKERS = data.speakers
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
