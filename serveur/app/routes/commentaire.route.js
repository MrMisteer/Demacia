const express = require('express')
const commentaire = require('../controllers/commentaire.controller')

const router = express.Router()

router.post('/', commentaire.create)
router.get('/:idJeu', commentaire.findByGame)

module.exports = router
