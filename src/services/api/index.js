import Auth from './auth.js'
import Tab from './tab.js'
import Speakers from './speakers.js'
import Message from './message.js'

let Api = {
  $auth: Auth,
  $tab: Tab,
  $message: Message,
  $speakers: Speakers
}

export default Api
