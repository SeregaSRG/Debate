import Auth from './auth.js'
import Account from './Account.js'
import Feedback from './feedback.js'
import Message from './message.js'

let Api = {
  $auth: Auth,
  $account: Account,
  $feedback: Feedback,
  $message: Message
}

export default Api
