import http from '../http-common'

class CommentaireDataService {
  // Créer un commentaire
  create (data) {
    return http.post('/commentaires', data)
  }

  // Récupérer tous les commentaires
  getAll () {
    return http.get('/commentaires')
  }

  // Récupérer les commentaires d'un jeu
  getByJeu (idJeu) {
    return http.get(`/commentaires/jeu/${idJeu}`)
  }

  // Supprimer un commentaire par son id
  delete (id) {
    return http.delete(`/commentaires/${id}`)
  }
}

export default new CommentaireDataService()
