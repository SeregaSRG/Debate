import Network from '../network.js'

export default {
  getQuestions (creds) {
    return Network.get('api/FeedBack/GetQuestions', creds)
  }
}
