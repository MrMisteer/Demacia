import http from '../http-common'

class FavorisDataService {
  // Ajouter un favori
  create (data) {
    return http.post('/favoris', data)
  }

  // Récupérer tous les favoris
  getAll () {
    return http.get('/favoris')
  }

  // Récupérer un favori par son id
  get (id) {
    return http.get(`/favoris/${id}`)
  }

  // Supprimer un favori par son id
  delete (id) {
    return http.delete(`/favoris/${id}`)
  }

  getAllByUser (userId) {
    return http.get(`/favoris/user/${userId}`)
  }
}

export default new FavorisDataService()
