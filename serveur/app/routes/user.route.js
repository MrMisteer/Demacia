const express = require('express')
const user = require('../controllers/user.controller.js')
const { isAdmin, verifyToken } = require('../middlewares/auth.middleware')

const router = express.Router()

// Routes publiques
router.post('/', user.create)
router.post('/login', user.findOne)

// Routes protégées
router.get('/auth', verifyToken, user.auth)
router.get('/logout', verifyToken, user.logout)

// Routes admin
router.get('/admin/all-users', verifyToken, isAdmin, user.findAll)

// Route de suppression
router.delete('/:id', verifyToken, user.deleteOne)

module.exports = router