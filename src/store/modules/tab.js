import * as types from '../mutation-types'
import api from '../../services/api'

const state = {
  tab: null,
  checkoutStatus: null
}

// getters
const getters = {
  getTab: state => state.tab,
  getTabByJudge: state => name => {
    const tab = state.tab
    let arr = []
    console.log(tab)
    for (let league in tab) {
      for (let round in tab[league]) {
        for (let room in tab[league][round]) {
          if (tab[league][round][room]['meta']['judge'] === name) {
            arr.push(tab[league][round][room])
          }
        }
      }
    }
    console.log(arr)
    return arr
  }
}

// actions
const actions = {
  getTab ({ commit, state }, credentials = {}) {
    return new Promise((resolve, reject) => {
      commit(types.TAB_REQUESTING)
      api.$tab.getTab(credentials)
        .then((response) => {
          if (response.data.status === 'done') {
            commit(types.TAB_SUCCESS, response.data.data)
            resolve()
          } else {
            commit(types.TAB_FAIL)
            reject(response.data.errorcode)
          }
        })
        .catch((data) => {
          alert(data)
          commit(types.TAB_FAIL)
          reject(data)
        })
    })
  }
}

// mutations
const mutations = {
  [types.TAB_REQUESTING] (state) {
    state.checkoutStatus = 'requesting'
  },
  [types.TAB_SUCCESS] (state, data) {
    state.checkoutStatus = null
    state.tab = JSON.parse(data.tab)
  },
  [types.TAB_FAIL] (state) {
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