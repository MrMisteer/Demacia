module.exports = (connex, Sequelize) => {
  const Commentaire = connex.define("commentaires", {
    Id_commentaire: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false
    },
    Contenue: {
      type: Sequelize.STRING(50),
      allowNull: false
    },
    Note: {
      type: Sequelize.INTEGER,
      allowNull: true
    },
    Id_jeu: {
      type: Sequelize.INTEGER,
      allowNull: false
    },
    Id_user: {
      type: Sequelize.INTEGER,
      allowNull: false
    },
    Date_commentaire: {
      type: Sequelize.DATEONLY,
      allowNull: false
    }
  }, {
    timestamps: false,
    freezeTableName: true
  });

  return Commentaire;
};