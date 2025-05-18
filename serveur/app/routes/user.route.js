module.exports = app => {
    const user = require('../controllers/user.controller.js')
    const { isAdmin } = require('../middlewares/auth.middleware')

    const router = require('express').Router()

    router.post('/', user.create)

    router.post('/login', user.findOne)

    router.get('/auth', user.auth)

    router.get('/logout', user.logout)

    router.get('/admin/all-users', isAdmin, user.findAll)

    router.delete('/:id', user.deleteOne)

    app.use('/api/user', router)
}