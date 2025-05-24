# Demacia

Il s'agit d'un site pour les jeux de société. L'utilisateur peut s’il a déjà joué à un jeu ou s’il souhaite y jouer. Le site propose des fiches pour chaque jeu de société, et une page présentant les différentes fonctionnalités associées pour chaque jeu disponible dans la base de données.

---

## Le projet

⚠️ ⚠️Après avoir rencontré quelques problèmes, le site final se trouve dans la branche "vues,etc".⚠️ ⚠️

##  Instructions pour cloner, configurer et exécuter le projet

### Prérequis
- Node.js (version 16 ou supérieure)
- MySQL
- Git

### Étapes

**Cloner le dépôt**
   git clone https://github.com/<votre-utilisateur>/Demacia.git
   cd Demacia

**Configurer la base de données**
 - Importez le fichier BDD.txt dans votre instance MySQL pour créer la base de données et les tables nécessaires
- Configurez les fichier db.config.js et db.js avec vos informations MySql

**Configurer le server côté backend**

- Accédez au fichier dmacia : cd demacia
- Lancez le server : node server.js

**Configurer le server côté frontend**

-Installer les dépendances : npm install
- Accédez au dossier server : cd ../server
- Lancez le serveur de développement : npm run dev
- Accédez à l'application sur http://localhost:8080

⚠️ ⚠️ Merci de vérifiez que vous êtes bien sur le port 8080
