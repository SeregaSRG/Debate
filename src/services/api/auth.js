import Network from '../network.js'

export default {
  login (creds) {
    return Network.get('user.login', creds)
  },
  checkLogin (creds) {
    return Network.get('user.checkLogin', creds)
  }
  /* ,
  register (creds) {
    return Network.post('api/Register', creds)
  },
  logout (creds) {
    return Network.get('api/Logout', creds)
  },
  refresh () {

  }
  */
}
