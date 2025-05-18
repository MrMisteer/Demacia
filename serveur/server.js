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

// Connexion BDD + création admin
const db = require('./app/models')
db.connex.sync().then(async () => {
  const User = db.user

  const existingAdmin = await User.findOne({ where: { email: 'admin@admin.com' } })

  if (!existingAdmin) {
    const hash = await bcrypt.hash('admin123', 10)

    await User.create({
      fullname: 'Admin',
      email: 'admin@admin.com',
      password: hash,
      role: 'admin'
    })

    console.log('✅ Admin créé : admin@admin.com / admin123')
  } else {
    console.log('ℹ️ Admin déjà présent en base')
  }
})

// Routes de l'application (doivent être AVANT app.listen)
require('./app/routes/jeu.route')(app)
require('./app/routes/user.route')(app)
require('./app/routes/favoris.route')(app)

// Lancement du serveur
const PORT = 8081
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`)
})
