const db = require('../models')
const Jeu = db.jeu

// Récupérer tous les jeux
exports.findAll = (req, res) => {
  console.log('Requête reçue pour récupérer tous les jeux')
  Jeu.findAll()
    .then(data => {
      console.log('Données récupérées:', data)
      res.send(data)
    })
    .catch(err => {
      console.error('Erreur détaillée:', err)
      res.status(500).send({
        message: err.message || 'Une erreur est survenue lors de la récupération des jeux'
      })
    })
}

// Créer un jeu
exports.create = (req, res) => {
  console.log('Reçu dans create() :', req.body)

  const {
    nom_jeu,
    photo,
    description,
    annee_sortie,
    mini_player,
    max_player,
    duree_mini,
    duree_max,
    categorie
  } = req.body

  if (!nom_jeu || !photo || !description || !annee_sortie || !mini_player || !max_player || !duree_mini || !duree_max || !categorie) {
    return res.status(400).send({ message: 'Tous les champs sont requis' })
  }

  db.jeu.create({
    nom_jeu,
    photo,
    description,
    annee_sortie,
    mini_player,
    max_player,
    duree_mini,
    duree_max,
    categorie
  })
    .then(data => res.status(201).send(data))
    .catch(err => {
      console.error('Erreur création jeu :', err)
      res.status(500).send({ message: err.message || 'Erreur serveur' })
    })
}


// Récupérer un jeu par ID
exports.findOne = (req, res) => {
  const id = req.params.id
  Jeu.findByPk(id)
    .then(data => res.send(data))
    .catch(err => {
      res.status(500).send({
        message: err.message || 'Erreur lors de la recherche'
      })
    })
}

// Modifier un jeu
exports.update = (req, res) => {
  const id = req.params.id
  Jeu.update(req.body, {
    where: { Id_jeu: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({ message: 'Jeu mis à jour' })
      } else {
        res.status(404).send({ message: 'Jeu non trouvé' })
      }
    })
    .catch(err => {
      res.status(500).send({
        message: err.message || 'Erreur lors de la mise à jour'
      })
    })
}

// Supprimer un jeu
exports.delete = (req, res) => {
  const id = req.params.id
  Jeu.destroy({
    where: { Id_jeu: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({ message: 'Jeu supprimé avec succès' })
      } else {
        res.status(404).send({ message: 'Jeu non trouvé' })
      }
    })
    .catch(err => {
      res.status(500).send({
        message: err.message || 'Erreur lors de la suppression'
      })
    })
}
