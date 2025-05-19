module.exports = app => {
    const user = require('../controllers/user.controller.js')
    const { isAdmin, verifyToken } = require('../middlewares/auth.middleware')

    const router = require('express').Router()

    router.post('/', user.create)           
    router.post('/login', user.findOne)     

    router.get('/auth', verifyToken, user.auth)
    router.get('/logout', verifyToken, user.logout)
    
    router.get('/admin/all-users', verifyToken, isAdmin, user.findAll)
    
    router.delete('/:id', verifyToken, user.deleteOne)

    app.use('/api/user', router)
}