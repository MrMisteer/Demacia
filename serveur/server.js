const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const app = express()


const cookieParser = require('cookie-parser')

const corsOption = {
    origin: 'http://localhost:8080',
    credentials: true, // authentication cookies
}
app.use(cors(corsOption))

app.use(cookieParser())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended:true }))
//test
app.get('/', (req, res) => {
    res.json({message: 'Welcome'})
})

const PORT =  8081
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`)
})

const db = require('./app/models')
db.connex.sync()


require('./app/routes/jeu.route')(app)
require('./app/routes/user.route')(app)
require('./app/routes/favoris.route')(app)
require('./app/routes/commentaire.route')(app)
