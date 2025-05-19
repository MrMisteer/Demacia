const db = require('../models')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

// Lister tous les utilisateurs via la procédure stockée
exports.findAll = async (req, res) => {
  try {
    const [data] = await db.connex.query("CALL lister_utilisateurs()")
    res.send(data)
  } catch (err) {
    res.status(500).send({ message: err.message })
  }
}

// Créer un utilisateur via la procédure stockée
exports.create = async (req, res) => {
    console.log('verif 1')
    console.log(req.body)
  if (!req.body.fullname || !req.body.email || !req.body.password) {
    return res.status(400).send({ message: "User must have fullname, email and password!" })
  }
  const salt = await bcrypt.genSalt(10)
  const hashPassword = await bcrypt.hash(req.body.password, salt)
  console.log('verif 2')
  console.log(req.body.email, hashPassword, req.body.fullname)
  try {
    await db.connex.query(
      "CALL ajouter_utilisateur(?, ?, ?)", 
      { replacements: [req.body.email, hashPassword, req.body.fullname] }
    )
    console.log('verif 3')
    res.send({ message: "Utilisateur créé" })
  } catch (err) {
    res.status(500).send({ message: err.message })
  }
}

// Vérifier un utilisateur par email (login)
exports.findOne = async (req, res) => {
  try {
    // Validation des données
    if (!req.body.email || !req.body.password) {
      return res.status(400).send({ message: 'Email et mot de passe requis' })
    }

    const [users] = await db.connex.query(
      "CALL verifier_utilisateur_par_email(?)",
      { replacements: [req.body.email] }
    )

    if (!users) {
      return res.status(400).send({ message: 'Utilisateur non trouvé' })
    }

    const validPassword = await bcrypt.compare(req.body.password, users.password)
    if (!validPassword) {
      return res.status(400).send({ message: 'Mot de passe incorrect' })
    }

    // Création du token avec expiration
    const token = jwt.sign(
      { id: users.id, role: users.role },
      'secret',
      { expiresIn: '24h' }
    )

    // Configuration du cookie
    res.cookie('jwt', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 24 * 60 * 60 * 1000 // 24 heures
    })

    // Réponse sans le mot de passe
    res.send({
      user: {
        id: users.id,
        fullname: users.fullname,
        email: users.email,
        role: users.role
      }
    })
  } catch (err) {
    console.error('Erreur login:', err)
    res.status(500).send({ message: err.message })
  }
}

// Vérifier l'authentification de l'utilisateur (exemple basique)
exports.auth = async (req, res) => {
  try {
    const token = req.cookies.jwt
    if (!token) {
      return res.status(401).send({ message: 'Non authentifié' })
    }

    const decoded = jwt.verify(token, 'secret')
    const [users] = await db.connex.query(
      "CALL verifier_utilisateur_par_id(?)",
      { replacements: [decoded.id] }
    )
    const user = users[0]

    if (!user) {
      res.clearCookie('jwt')
      return res.status(401).send({ message: 'Utilisateur non trouvé' })
    }

    // Ne pas renvoyer le mot de passe
    delete user.password
    res.send({ user })
  } catch (err) {
    console.error('Erreur auth:', err)
    res.clearCookie('jwt')
    res.status(401).send({ message: 'Token invalide' })
  }
}

// Déconnexion (suppression du cookie)
exports.logout = async (req, res) => {
  res.clearCookie('jwt')
  res.send({ message: 'Déconnecté' })
}

// Supprimer un utilisateur via la procédure stockée
exports.deleteOne = async (req, res) => {
  try {
    await db.connex.query(
      "CALL supprimer_utilisateur(?)",
      { replacements: [req.params.id] }
    )
    res.send({ message: 'Utilisateur supprimé avec succès' })
  } catch (error) {
    res.status(500).send({ message: 'Erreur serveur', error })
  }
}
