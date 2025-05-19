const db = require('../../db');

// Créer un favori via la procédure stockée
exports.create = async (req, res) => {
  const { Id_jeu, Id_user, Date_ajout } = req.body;
  console.log(req.body);
  if (!Id_jeu || !Id_user || !Date_ajout) {
    return res.status(400).send({ message: "Id_jeu, Id_user et Date_ajout sont requis !" });
  }
  try {
    await db.query(
      "CALL AjouterFavori(?, ?, ?)",
      [Id_jeu, Id_user, Date_ajout]
    );
    res.status(201).send({ message: "Favori ajouté !" });
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
}

// Récupérer tous les favoris
exports.findAll = async (req, res) => {
  try {
    const [data] = await db.query("SELECT * FROM Favoris");
    res.send(data);
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
}

// Récupérer un favori par son id
exports.findOne = async (req, res) => {
  try {
    const [data] = await db.query("SELECT * FROM Favoris WHERE Id_favoris = ?", [req.params.id]);
    if (!data[0]) {
      return res.status(404).send({ message: "Favori non trouvé" });
    }
    res.send(data[0]);
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
}

// Supprimer un favori par son id
exports.delete = async (req, res) => {
  try {
    const [result] = await db.query("DELETE FROM Favoris WHERE Id_favoris = ?", [req.params.id]);
    if (result.affectedRows === 1) {
      res.send({ message: "Favori supprimé !" });
    } else {
      res.status(404).send({ message: "Favori non trouvé" });
    }
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
}

// Récupérer tous les favoris d'un utilisateur
exports.findAllByUser = async (req, res) => {
  try {
    const [data] = await db.query("SELECT * FROM Favoris WHERE Id_user = ?", [req.params.id]);
    console.log(data);
    res.send(data);
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
}