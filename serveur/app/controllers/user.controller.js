const db = require('../../db');
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

// Lister tous les utilisateurs via la procédure stockée
exports.findAll = async (req, res) => {
  try {
    const [data] = await db.query("CALL lister_utilisateurs()");
    res.send(data[0]);
  } catch (err) {
    res.status(500).send({ message: err.message });
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
    await db.query(
      "CALL ajouter_utilisateur(?, ?, ?, ?, ?)",
      [req.body.email, hashPassword, req.body.fullname, '', 'user']
)
    res.send({ message: "Utilisateur créé" })
  } catch (err) {
    res.status(500).send({ message: err.message })
  }
}

// Vérifier un utilisateur par email (login)
exports.findOne = async (req, res) => {
  try {
    if (!req.body.email || !req.body.password) {
      return res.status(400).send({ message: 'Email et mot de passe requis' })
    }

    const [[user]] = await db.query(
      "CALL verifier_utilisateur_par_email(?)",
      [req.body.email]
    );

    if (!user) {
      return res.status(400).send({ message: 'Utilisateur non trouvé' })
    }

    const validPassword = await bcrypt.compare(req.body.password, user[0].password)
    if (!validPassword) {
      return res.status(400).send({ message: 'Mot de passe incorrect' })
    }

    const token = jwt.sign(
      { id: user[0].id, role: user[0].role },
      'secret',
      { expiresIn: '24h' }
    )

    res.cookie('jwt', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 24 * 60 * 60 * 1000
    })
    delete user[0].password
    res.send({ user: {
      id: user[0].id,
      fullname: user[0].fullname,
      email: user[0].email,
      role: user[0].role
    }})
  } catch (err) {
    console.error('Erreur login:', err)
    res.status(500).send({ message: err.message })
  }
}

// Vérifier l'authentification de l'utilisateur
exports.auth = async (req, res) => {
  try {
    const token = req.cookies.jwt
    if (!token) {
      return res.status(401).send({ message: 'Non authentifié' })
    }

    const decoded = jwt.verify(token, 'secret')
    const [[user]] = await db.query(
      "CALL verifier_utilisateur_par_id(?)",
      [decoded.id]
    )

    if (!user) {
      res.clearCookie('jwt')
      return res.status(401).send({ message: 'Utilisateur non trouvé' })
    }

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
    console.log('Suppression de l\'utilisateur avec ID:', req.params.id)
    await db.query(
      "CALL supprimer_utilisateur(?)",[req.params.id]
    )
    res.send({ message: 'Utilisateur supprimé avec succès' })
  } catch (error) {
    res.status(500).send({ message: 'Erreur serveur', error })
  }
}
