module.exports = app => {
  const commentaire = require('../controllers/commentaire.controller')
  const router = require('express').Router()

  router.post('/', commentaire.create)
  router.get('/:idJeu', commentaire.findByGame)

  app.use('/api/commentaires', router)
}
