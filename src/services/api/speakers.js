import Network from '../network.js'

export default {
  getSpeakers (creds) {
    return Network.get('speakers.get', creds)
  }
}
