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
  if (!req.body.fullname || !req.body.email || !req.body.password) {
    return res.status(400).send({ message: "User must have fullname, email and password!" })
  }
  const salt = await bcrypt.genSalt(10)
  const hashPassword = await bcrypt.hash(req.body.password, salt)
  try {
    await db.connex.query(
      "CALL ajouter_utilisateur(?, ?, ?)", 
      { replacements: [req.body.email, hashPassword, req.body.fullname] }
    )
    res.send({ message: "Utilisateur créé" })
  } catch (err) {
    res.status(500).send({ message: err.message })
  }
}

// Vérifier un utilisateur par email (login)
exports.findOne = async (req, res) => {
  try {
    const [users] = await db.connex.query(
      "CALL verifier_utilisateur_par_email(?)",
      { replacements: [req.body.email] }
    )
    const user = users[0]
    if (!user) {
      return res.status(400).send({ message: 'Username not found' })
    }
    if (!await bcrypt.compare(req.body.password, user.Mot_de_passe)) {
      return res.status(400).send({ message: 'password incorrect' })
    }
    const token = jwt.sign({ id: user.Id_utilisateur }, 'secret')
    res.cookie('jwt', token, {
      httpOnly: true,
      maxAge: 24 * 60 * 60 * 1000,
      sameSite: 'lax'
    })
    res.send({
      token: token,
      user: {
        id: user.Id_utilisateur,
        fullname: user.fullname,
        email: user.Email,
        role: user.role
      }
    })
  } catch (err) {
    res.status(500).send({ message: err.message })
  }
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
