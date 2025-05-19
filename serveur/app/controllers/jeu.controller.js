const db = require('../models')

// Récupérer tous les jeux
exports.findAll = async (req, res) => {
  try {
    const [data] = await db.connex.query("SELECT * FROM Jeu")
    res.send(data)
  } catch (err) {
    res.status(500).send({ message: err.message })
  }
}

// Créer un jeu via la procédure stockée
exports.create = async (req, res) => {
  const {
    nom_jeu, photo, description, annee_sortie,
    mini_player, max_player, duree_mini, duree_max, categorie
  } = req.body
  if (!nom_jeu || !photo || !description || !annee_sortie || !mini_player || !max_player || !duree_mini || !duree_max || !categorie) {
    return res.status(400).send({ message: 'Tous les champs sont requis' })
  }
  try {
    await db.connex.query(
      "CALL AjouterJeu(?, ?, ?, ?, ?, ?, ?, ?, ?)",
      { replacements: [nom_jeu, photo, description, annee_sortie, mini_player, max_player, duree_mini, duree_max, categorie] }
    )
    res.status(201).send({ message: "Jeu ajouté avec succès" })
  } catch (err) {
    res.status(500).send({ message: err.message })
  }
}

// Récupérer un jeu par ID
exports.findOne = async (req, res) => {
  try {
    const [data] = await db.connex.query("SELECT * FROM Jeu WHERE Id_jeu = ?", { replacements: [req.params.id] })
    res.send(data[0])
  } catch (err) {
    res.status(500).send({ message: err.message })
  }
}

// Modifier un jeu via la procédure stockée
exports.update = async (req, res) => {
  const id = req.params.id
  const {
    nom_jeu, photo, description, annee_sortie,
    mini_player, max_player, duree_mini, duree_max, categorie
  } = req.body
  try {
    await db.connex.query(
      "CALL ModifierJeu(?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
