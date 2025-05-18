const db = require('../models')
const Commentaire = db.commentaire

exports.create = (req, res) => {
  const { texte, note, Id_jeu } = req.body

  if (!texte || !note || !Id_jeu) {
    return res.status(400).send({ message: 'Champs requis manquants.' })
  }

  Commentaire.create({ texte, note, Id_jeu })
    .then(data => res.send(data))
    .catch(err => res.status(500).send({ message: err.message }))
}

exports.findByGame = (req, res) => {
  const id = req.params.idJeu

  Commentaire.findAll({ where: { Id_jeu: id } })
    .then(data => res.send(data))
    .catch(err => res.status(500).send({ message: err.message }))
}
