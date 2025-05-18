module.exports = (sequelize, DataTypes) => {
  const Commentaire = sequelize.define('commentaire', {
    texte: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    note: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        min: 0,
        max: 10
      }
    },
    Id_jeu: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  })

  return Commentaire
}
