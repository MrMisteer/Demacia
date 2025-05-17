import http from '../http-common'
class UserDataService {
  login (data) {
    return http.post('/login', data)
  }

  register (data) {
    return http.post('/register', data)
  }

  getAuth () {
    return http.get('/user/auth')
  }

  logout () {
    return http.get('/logout')
  }
}
export default new UserDataService()
