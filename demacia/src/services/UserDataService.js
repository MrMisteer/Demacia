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

  getUser () {
    return http.get('/user')
  }

  deleteUser (id) {
    return http.delete(`/user/${id}`)
  }
}
export default new UserDataService()
