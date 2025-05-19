const db = require('../models')
const User = db.user
const jwt = require('jsonwebtoken')

const verifyToken = async (req, res, next) => {
  const token = req.cookies['jwt']
  if (!token) return res.status(401).send({ message: 'Non authentifié' })

  let decoded
  try {
    decoded = jwt.verify(token, 'secret')
  } catch (e) {
    return res.status(401).send({ message: 'Token invalide' })
  }

  const user = await User.findOne({ where: { id: decoded.id } })
  if (!user) {
    return res.status(401).send({ message: 'Utilisateur non trouvé' })
  }

  req.user = user
  next()
}

const isAdmin = async (req, res, next) => {
  const token = req.cookies['jwt']
  if (!token) return res.status(401).send({ message: 'Non authentifié' })

  let decoded
  try {
    decoded = jwt.verify(token, 'secret')
  } catch (e) {
    return res.status(401).send({ message: 'Token invalide' })
  }

  const user = await User.findOne({ where: { id: decoded.id } })
  if (!user || user.role !== 'admin') {
    return res.status(403).send({ message: 'Accès refusé (admin seulement)' })
  }

  req.user = user 
  next()
}

module.exports = { verifyToken, isAdmin }
