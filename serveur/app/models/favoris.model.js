module.exports = (connex, Sequelize) => {
  const Favoris = connex.define("favoris", {
    Id_favoris: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    Id_user: {
      type: Sequelize.INTEGER,
      allowNull: false
    },
    Id_jeu: {
      type: Sequelize.INTEGER,
      allowNull: false
    },
    Date_ajout: {
      type: Sequelize.DATEONLY,
      allowNull: false
    }
  }, {
    timestamps: false,
    freezeTableName: true
  });

  return Favoris;
};
