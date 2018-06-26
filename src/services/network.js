import axios from 'axios'
import store from '../store'

const HTTP = axios.create({
  baseURL: 'http://faustus12-002-site2.itempurl.com/',
  // headers: {'Content-Type': 'application/x-www-form-urlencoded'}
  headers: {'Content-Type': 'application/json'}
})

export default {
  post (url, body) {
    body.Token = store.getters['auth/getToken']
    JSON.stringify(body)
    return HTTP.post(url, body)
  },
  get (url, body) {
    body.Token = store.getters['auth/getToken']
    return HTTP.get(url, {
      params: body
    })
  },
  put (url, body) {
    body.Token = store.getters['auth/getToken']
    JSON.stringify(body)
    return HTTP.put(url, body)
  },
  delete (url, body) {
    body.Token = store.getters['auth/getToken']
    JSON.stringify(body)
    return HTTP.delete(url, {params: body})
  }
}
