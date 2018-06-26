import * as types from './mutation-types'

export const dummy = ({ commit }) => {
  console.log('Dummy actions' + types.AUTH_SUCCESS)
}
