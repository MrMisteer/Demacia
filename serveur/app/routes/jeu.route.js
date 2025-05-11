module.exports = app => {
    const jeu = require('../controllers/jeu.controller.js')
    const router = require('express').Router()
    router.get('/', jeu.findAll)
    router.post('/', jeu.create)
    router.get('/:id', jeu.findOne)
    router.delete('/:id', jeu.delete)
    router.put('/:id', jeu.update)
    app.use('/api/jeu', router)
}