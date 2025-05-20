const db = require('../models')

// Créer un commentaire via la procédure stockée
exports.create = async (req, res) => {
  console.log(req.body)
  const { texte, note, Id_jeu, Id_user } = req.body
  if (!texte || !note || !Id_jeu || !Id_user) {
    return res.status(400).send({ message: 'Champs requis manquants.' })
  }
  try {
    await db.connex.query(
      "CALL AjouterCommentaire(?, ?, ?, ?)",
      { replacements: [texte, note, Id_jeu, Id_user] }
    )
    res.status(201).send({ message: "Commentaire ajouté" })
  } catch (err) {
    console.error('Erreur ajout commentaire:', err)
    res.status(500).send({ message: err.message })
  }
}

// Récupérer les commentaires d'un jeu via la vue
exports.findByGame = async (req, res) => {
  const id = req.params.idJeu
  try {
    const [data] = await db.connex.query(
      "SELECT * FROM VueCommentairesJeu WHERE Id_jeu = ?",
      { replacements: [id] }
    )
    res.send(data)
  } catch (err) {
    res.status(500).send({ message: err.message })
  }
}
