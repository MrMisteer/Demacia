module.exports = app => {
  const favoris = require('../controllers/favoris.controller.js')
  const router = require('express').Router()

  // Ajouter un favori
  router.post('/', favoris.create)

  // Récupérer tous les favoris
  router.get('/', favoris.findAll)

  // Récupérer un favori par son id
  router.get('/:id', favoris.findOne)

  // Supprimer un favori par son id
  router.delete('/:id', favoris.delete)

  // Récupérer tous les favoris d'un utilisateur par son id
  router.get('/user/:id', favoris.findAllByUser)

  app.use('/api/favoris', router)
}