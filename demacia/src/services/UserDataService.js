import http from '../http-common'
class UserDataService {
  create (data) {
    return http.post('/user', data)
  }

  login (data) {
    return http.post('/user/login', data)
  }

  register (data) {
    return http.post('/register', data)
  }

  getAuth () {
    return http.get('/user/auth')
  }

  logout () {
    return http.get('/user/logout')
  }
}
export default new UserDataService()
