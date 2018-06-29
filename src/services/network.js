import axios from 'axios'
import store from '../store'

const HTTP = axios.create({
  baseURL: 'http://d-core.microfox.ru/api/',
  headers: {'Content-Type': 'application/x-www-form-urlencoded'}
})

export default {
  post (url, body) {
    body.token = store.getters['auth/getToken']
    JSON.stringify(body)
    return HTTP.post(url, body)
  },
  get (url, body) {
    body.token = store.getters['auth/getToken']
    return HTTP.get(url, {
      params: body
    })
  },
  put (url, body) {
    body.token = store.getters['auth/getToken']
    JSON.stringify(body)
    return HTTP.put(url, body)
  },
  delete (url, body) {
    body.token = store.getters['auth/getToken']
    JSON.stringify(body)
    return HTTP.delete(url, {params: body})
  }
}
