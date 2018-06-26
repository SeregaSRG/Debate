/*
    Vue Plugin
    Install all services on Vue System
*/

import Network from './network.js'
import Auth from './api/auth.js'
import Account from './api/account.js'
import Feedback from './api/feedback.js'
import Message from './api/message.js'
import Api from './api'

function plugin (Vue) {
  if (plugin.installed) {
    return
  }
  Vue.prototype.$network = Network
  Vue.prototype.$auth = Auth
  Vue.prototype.$account = Account
  Vue.prototype.$feedback = Feedback
  Vue.prototype.$message = Message
  Vue.prototype.$api = Api
}

if (typeof window !== 'undefined' && window.Vue) {
  window.Vue.use(plugin)
}

export default plugin
