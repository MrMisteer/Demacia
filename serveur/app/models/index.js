const dbConfig = require('../config/db.config.js');
const Sequelize = require('sequelize');

// Initialisation de Sequelize
const connex = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,
  port: 3306,
  logging: false // Désactive les logs SQL (optionnel)
});

// Test de connexion
connex.authenticate()
  .then(() => {
    console.log('Connexion à la base de données réussie.');
  })
  .catch(err => {
    console.error('Impossible de se connecter à la base de données :', err);
  });

// Initialisation des modèles
const db = {};
db.Sequelize = Sequelize;
db.connex = connex;
db.jeu = require('./jeu.model.js')(connex, Sequelize);
db.user = require('./user.model.js')(connex, Sequelize);
db.favoris = require('./favoris.model.js')(connex, Sequelize);
db.commentaires = require('./commentaire.model.js')(connex, Sequelize);

// Exportation
module.exports = db;