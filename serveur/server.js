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
    console.log('ℹAdmin déjà présent en base')
  }

  // Création des index pour optimiser les requêtes
  try {
    await sequelize.query(`CREATE INDEX IF NOT EXISTS idx_nom_jeu ON Jeu(Nom_jeu);`)
    await sequelize.query(`CREATE INDEX IF NOT EXISTS idx_commentaires_jeu ON Commentaires(Id_jeu);`)
    await sequelize.query(`CREATE INDEX IF NOT EXISTS idx_mettre_utilisateur ON Mettre(Id_utilisateur);`)
    console.log('Index créés avec succès')
  } catch (err) {
    console.error('Erreur lors de la création des index :', err)
  }
})

// Routes de l'application
require('./app/routes/jeu.route')(app)
require('./app/routes/user.route')(app)
require('./app/routes/favoris.route')(app)

// Lancement du serveur
const PORT = 8081
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`)
})
