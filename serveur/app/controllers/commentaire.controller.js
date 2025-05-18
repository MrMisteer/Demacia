const db = require('../models')
const Commentaire = db.commentaires

// Créer un commentaire
exports.create = async (req, res) => {
  try {
    if (!req.body.Contenue || !req.body.Id_jeu) {
      return res.status(400).send({ message: "Le contenu et l'Id_jeu sont requis !" })
    }
    const commentaire = await Commentaire.create({
      Contenue: req.body.Contenue,
      Note: req.body.Note,
      Id_jeu: req.body.Id_jeu,
      Id_user: req.body.Id_user,
      Date_commentaire: req.body.Date_commentaire || new Date()
    })
    res.status(201).send(commentaire)
  } catch (err) {
    console.error(err)
    res.status(500).send({ message: err.message })
  }
}

// Récupérer tous les commentaires
exports.findAll = async (req, res) => {
  try {
    console.log('findAll called - attempting to fetch comments');
    const commentaires = await Commentaire.findAll();
    console.log('Comments retrieved:', commentaires);
    res.send(commentaires);
  } catch (err) {
    console.error('Detailed SQL Error:', err);
    res.status(500).send({ 
      message: err.message,
      stack: process.env.NODE_ENV === 'development' ? err.stack : undefined 
    });
  }
}

// Récupérer les commentaires d'un jeu
exports.findByJeu = async (req, res) => {
  try {
    const commentaires = await Commentaire.findAll({ where: { Id_jeu: req.params.id } })
    res.send(commentaires)
  } catch (err) {
    res.status(500).send({ message: err.message })
  }
}

// Supprimer un commentaire par son id
exports.delete = async (req, res) => {
  try {
    const nb = await Commentaire.destroy({ where: { Id_commentaire: req.params.id } })
    if (nb === 1) {
      res.send({ message: "Commentaire supprimé !" })
    } else {
      res.status(404).send({ message: "Commentaire non trouvé" })
    }
  } catch (err) {
    console.error(err); // Ajoute ce log pour voir l'erreur exacte dans la console
    res.status(500).send({ message: err.message })
  }
}