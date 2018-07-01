import Network from '../network.js'

export default {
  getTab (creds) {
    return Network.get('tab.get', creds)
  },
  saveTab (creds) {
    return Network.post('tab.save', creds)
  }
}
