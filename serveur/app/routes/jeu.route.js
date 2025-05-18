module.exports = app => {
    const jeu = require('../controllers/jeu.controller.js')
    const router = require('express').Router()
    const auth = require('../middlewares/auth.middleware.js')
    router.get('/', jeu.findAll)
    router.post('/', jeu.create)
    router.get('/:id', jeu.findOne)
    router.put('/:id', jeu.update)
    router.delete('/admin/delete/:id', auth.isAdmin, jeu.delete)


    app.use('/api/jeu', router)
}