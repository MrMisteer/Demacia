const express = require('express')
const jeu = require('../controllers/jeu.controller.js')
const auth = require('../middlewares/auth.middleware.js')

const router = express.Router()

router.get('/', jeu.findAll)
router.post('/', auth.isAdmin, jeu.create)
router.get('/:id', jeu.findOne)
router.put('/:id', jeu.update)
router.delete('/admin/delete/:id', auth.isAdmin, jeu.delete)

module.exports = router