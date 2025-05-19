const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const cookieParser = require('cookie-parser')
const bcrypt = require('bcryptjs')

const app = express()

// CORS avec credentials (cookies entre ports différents)
const corsOptions = {
  origin: 'http://localhost:8080',
  credentials: true
}
app.use(cors(corsOptions))
app.use(cookieParser())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

// Test route
app.get('/', (req, res) => {
  res.json({ message: 'Welcome' })
})

// Connexion BDD + création admin + indexation
const db = require('./app/models')
db.connex.sync().then(async () => {
  const User = db.user
  const sequelize = db.connex

  // Création d’un admin par défaut si pas déjà présent
  const existingAdmin = await User.findOne({ where: { email: 'admin@admin.com' } })
  if (!existingAdmin) {
    const hash = await bcrypt.hash('admin123', 10)

    await User.create({
      fullname: 'Admin',
      email: 'admin@admin.com',
      password: hash,
      role: 'admin'
    })
    console.log('Admin créé : admin@admin.com / admin123')
  } else {
    console.log('Admin déjà présent en base')
  }

  // Création des index pour optimiser les requêtes
    // Création des index (en MySQL, pas de IF NOT EXISTS — on ignore l'erreur si déjà existant)
  sequelize.query(`CREATE INDEX idx_nom_jeu ON Jeu(nom_jeu);`).catch(() => {})
  sequelize.query(`CREATE INDEX idx_commentaires_jeu ON Commentaires(Id_jeu);`).catch(() => {})
  sequelize.query(`CREATE INDEX idx_mettre_utilisateur ON Mettre(Id_utilisateur);`).catch(() => {})
  

})

// Routes de l'application
const jeuRoutes = require('./app/routes/jeu.route')
const userRoutes = require('./app/routes/user.route')
const favorisRoutes = require('./app/routes/favoris.route')
const commentaireRoutes = require('./app/routes/commentaire.route')

app.use('/api/jeu', jeuRoutes)
app.use('/api/user', userRoutes)
app.use('/api/favoris', favorisRoutes)
app.use('/api/commentaire', commentaireRoutes)


// Lancement du serveur
const PORT = 8081
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`)
})
