module.exports = (connex, Sequelize) => {
    const Jeu = connex.define('jeu', {
        Id_jeu: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            field: 'Id_jeu'
        },
        nom_jeu: {
            type: Sequelize.STRING,
            field: 'Nom_jeu'
        },
        photo: {
            type: Sequelize.TEXT,
            field: 'Photo'
        },
        description: {
            type: Sequelize.TEXT,
            field: 'Description'
        },
        annee_sortie: {
            type: Sequelize.INTEGER,
            field: 'Annee_sortie'
        },
        mini_player: {
            type: Sequelize.INTEGER,
            field: 'Mini_player'
        },
        max_player: {
            type: Sequelize.INTEGER,
            field: 'Max_player'
        },
        duree_mini: {
            type: Sequelize.TIME,
            field: 'Duree_mini'
        },
        duree_max: {
            type: Sequelize.TIME,
            field: 'Duree_max'
        },
        categorie: {
            type: Sequelize.STRING,
            field: 'Categorie'
        }
    }, {
        freezeTableName: true,
        timestamps: false
    });

    return Jeu;
};