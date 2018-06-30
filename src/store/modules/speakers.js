import * as types from '../mutation-types'
import api from '../../services/api'

const state = {
  speakers: [],
  judges: []
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
        default:
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
  },
  getTeamsF: state => {
    let result = {
      'k': [],
      'v': [],
      'b': [],
      'e': []
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
        default:
          league = 'e'
          break
      }
      if (result[league].find(x => x.team === item.team) === undefined) {
        result[league].push(
          {
            'team': item.team,
            'used': false,
            'club': item.club
          }
        )
      }
    })
    console.log('getTeamsF', result)
    return result
  },
  getJudges: state => state.judges,
  getJudgesF: state => state.judges.map(judge => {
    judge['used'] = false
    judge['league'] = judge['league'].split(', ')
    return judge
  }),
  getClubs: state => {
    let result = {}
    state.speakers.forEach(function (item, i, arr) {
      if (result[item.club] === undefined) {
        result[item.club] = 0
        result[item.club] += 1
      } else {
        result[item.club] += 1
      }
    })
    return result
  }
}

// actions
const actions = {
  getSpeakers ({ commit, state }, credentials = {}) {
    return new Promise((resolve, reject) => {
      commit(types.SPEAKERS_REQUESTING)
      api.$speakers.getSpeakers(credentials)
        .then((response) => {
          if (response.data.status === 'done') {
            commit('SPEAKERS_GET_SUCCESS', response.data.data)
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
  },
  saveSpeakers ({ commit, state }, credentials) {
    return new Promise((resolve, reject) => {
      commit(types.SPEAKERS_REQUESTING)
      api.$speakers.saveSpeakers(credentials)
        .then((response) => {
          if (response.data.status === 'done') {
            commit('SPEAKERS_SAVE_SUCCESS', response.data.data)
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
  },
  getJudges ({ commit, state }, credentials = {}) {
    return new Promise((resolve, reject) => {
      commit(types.SPEAKERS_REQUESTING)
      api.$speakers.getJudges(credentials)
        .then((response) => {
          if (response.data.status === 'done') {
            commit('JUDGES_GET_SUCCESS', response.data.data)
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
  },
  saveJudges ({ commit, state }, credentials) {
    return new Promise((resolve, reject) => {
      commit(types.SPEAKERS_REQUESTING)
      api.$speakers.saveJudges(credentials)
        .then((response) => {
          if (response.data.status === 'done') {
            commit('JUDGES_SAVE_SUCCESS', response.data.data)
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
  },
  SPEAKERS_GET_SUCCESS (state, data) {
    state.checkoutStatus = null
    state.speakers = data.speakers
  },
  SPEAKERS_SAVE_SUCCESS (state, data) {
    state.checkoutStatus = null
    state.speakers = data.speakers
  },
  JUDGES_GET_SUCCESS (state, data) {
    state.checkoutStatus = null
    state.judges = data.judges
  },
  JUDGES_SAVE_SUCCESS (state, data) {
    state.checkoutStatus = null
    state.judges = data.judges
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
