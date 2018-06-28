import Network from '../network.js'

export default {
  getTab (creds) {
    return Network.get('tab.get', creds)
  }
}
