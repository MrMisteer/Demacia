const db = require('../models')
const Favoris = db.favoris

// Créer un favori
exports.create = async (req, res) => {
  try {
    console.log('Reçu du front :', req.body) // Ajoute ce log ici
    if (!req.body.Id_jeu || !req.body.Date_ajout || !req.body.Id_user) {
      return res.status(400).send({ message: "Id_jeu, Id_user et Date_ajout sont requis !" })
    }
    const favori = await Favoris.create({
      Id_jeu: req.body.Id_jeu,
      Id_user: req.body.Id_user, // <-- Ajouté ici
      Date_ajout: req.body.Date_ajout
    })
    res.status(201).send(favori)
  } catch (err) {
    res.status(500).send({ message: err.message })
  }
}

// Récupérer tous les favoris
exports.findAll = async (req, res) => {
  try {
    const favoris = await Favoris.findAll()
    res.send(favoris)
  } catch (err) {
    res.status(500).send({ message: err.message })
  }
}

// Récupérer un favori par son id
exports.findOne = async (req, res) => {
  try {
    const favori = await Favoris.findByPk(req.params.id)
    if (!favori) {
      return res.status(404).send({ message: "Favori non trouvé" })
    }
    res.send(favori)
  } catch (err) {
    res.status(500).send({ message: err.message })
  }
}

// Supprimer un favori par son id
exports.delete = async (req, res) => {
  try {
    const nb = await Favoris.destroy({ where: { Id_favoris: req.params.id } })
    if (nb === 1) {
      res.send({ message: "Favori supprimé !" })
    } else {
      res.status(404).send({ message: "Favori non trouvé" })
    }
  } catch (err) {
    res.status(500).send({ message: err.message })
  }
}

// Récupérer tous les favoris d'un utilisateur
exports.findAllByUser = async (req, res) => {
  try {
    const favoris = await Favoris.findAll({ where: { Id_user: req.params.id } })
    res.send(favoris)
  } catch (err) {
    res.status(500).send({ message: err.message })
  }
}