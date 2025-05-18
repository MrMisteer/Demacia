module.exports = app => {
  const commentaire = require('../controllers/commentaire.controller.js')
  const router = require('express').Router()

  // Créer un commentaire
  router.post('/', commentaire.create)

  // Récupérer tous les commentaires
  router.get('/', commentaire.findAll)

  // Récupérer les commentaires d'un jeu
  router.get('/jeu/:id', commentaire.findByJeu)

  // Supprimer un commentaire par son id
  router.delete('/:id', commentaire.delete)

  app.use('/api/commentaires', router)
}