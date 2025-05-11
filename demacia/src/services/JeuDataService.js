import http from '../http-common'

class JeuDataService {
  getAll () {
    console.log('Calling getAll() in JeuDataService')
    return http.get('/jeu').catch(error => {
      console.error('Error in JeuDataService.getAll():', error)
      throw error
    })
  }

  get (id) {
    return http.get(`/jeu/${id}`)
  }

  create (data) {
    return http.post('/jeu', data)
  }

  update (id, data) {
    return http.put(`/jeu/${id}`, data)
  }

  delete (id) {
    return http.delete(`/jeu/${id}`)
  }
}

export default new JeuDataService()
