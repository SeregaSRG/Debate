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
  getSpeakers: state => state.speakers.sort((a, b) => {
    if (a.league > b.league) {
      return 1
    }
    if (a.league < b.league) {
      return -1
    }
    return 0
  }),
  getTeams: state => {
    let result = {
      'k': {},
      'v': {},
      'b': {},
      'e': {}
    }
    state.speakers.forEach(function (item, i, arr) {
      let league = ''
      switch (item.league) {
        case 'КП':
          league = 'k'
          break
        case 'ВШФ':
          league = 'v'
          break
        case 'БПФ':
          league = 'b'
          break
        case 'EN':
          league = 'e'
          break
      }
      if (result[league][item.team] === undefined) {
        result[league][item.team] = []
        result[league][item.team].push(item)
      } else {
        result[league][item.team].push(item)
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
