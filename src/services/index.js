/*
    Vue Plugin
    Install all services on Vue System
*/

import Network from './network.js'
import Auth from './api/auth.js'
import Tab from './api/tab.js'
import Speakers from './api/speakers.js'
import Api from './api'

function plugin (Vue) {
  if (plugin.installed) {
    return
  }
  Vue.prototype.$network = Network
  Vue.prototype.$auth = Auth
  Vue.prototype.$tab = Tab
  Vue.prototype.$speakers = Speakers
  Vue.prototype.$api = Api
}

if (typeof window !== 'undefined' && window.Vue) {
  window.Vue.use(plugin)
}

export default plugin
