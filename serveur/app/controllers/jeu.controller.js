const db = require('../models')
const Jeu = db.jeu

//  Récupérer tous les jeux
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

//  Créer un jeu
exports.create = (req, res) => {
  if (!req.body.name) {
    res.status(400).send({ message: 'Le nom est obligatoire' })
    return
  }

  Jeu.create(req.body)
    .then(data => res.send(data))
    .catch(err => {
      res.status(500).send({
        message: 'Impossible d’insérer le jeu'
      })
    })
}

//  Récupérer un jeu par ID
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

//  Modifier un jeu
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


exports.delete = (req, res) => {
  const id = req.params.id
  Jeu.destroy({
    where: { Id_jeu: id } // 
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
