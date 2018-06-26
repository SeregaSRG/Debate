import Network from '../network.js'

export default {
  getUser (creds) {
    return Network.get('api/Account/GetUserData', creds)
  },
  changeNick (creds) {
    return Network.put('api/Account/ChangeNick', creds)
  },
  changeName (creds) {
    return Network.put('api/Account/ChangeName', creds)
  },
  changeCity (creds) {
    return Network.put('api/Account/ChangeCity', creds)
  },
  changeUserAbout (creds) {
    return Network.put('api/Account/ChangeUserAbout', creds)
  },
  changeMessageBan (creds) {
    return Network.put('api/Account/MessageBan', creds)
  },
  getAnotherUser (creds) {
    return Network.post('api/UserInfo/CommonUserInfo', creds)
  }
}
