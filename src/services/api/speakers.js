import Network from '../network.js'

export default {
  getSpeakers (creds) {
    return Network.get('speaker.get', creds)
  },
  saveSpeakers (creds) {
    return Network.post('speaker.save', creds)
  },
  getJudges (creds) {
    return Network.get('speaker.getJudges', creds)
  },
  saveJudges (creds) {
    return Network.post('speaker.saveJudges', creds)
  }
}
