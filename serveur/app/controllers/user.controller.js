const db = require('../models')
const userModel = require('../models/user.model')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const User = db.user


//const OP = db.Sequelize.Op
const https = require('http')

exports.findAll = (req, res) => {
    User.findAll()
    .then(data => {
        res.send(data)
    })
}

exports.create = async (req, res) => {
    if (!req.body.fullname || !req.body.email || !req.body.password) {
        res.status(400).send({
            message: "User must have fullname, email and password!"
        })
        return;
    }
    const salt = await bcrypt.genSalt(10)
    const hashPassword = await bcrypt.hash(req.body.password, salt)
    await User.create({
        fullname : req.body.fullname,
        email : req.body.email,
        password : hashPassword
    })
        .then(data => {
            res.send(data)
        })
        .catch(err => {
            res.status(500).send({
                message: 'Could not insert the data'
            })
        })
}

exports.findOne = async (req, res, next) => {
    console.log('Tentative de login :', req.body.email)
    const user = await User.findOne({where: {email:req.body.email}})

    if(!user){
        console.log('Utilisateur introuvable')
        return res.status(400).send({
            message: 'Username not found'
           })
    }

    if(!await bcrypt.compare(req.body.password, user.password)){
        console.log(' Mot de passe incorrect')
        return res.status(400).send({
            message: 'password incorrect'
           })
    }
     const token =  jwt.sign({id: user.id}, 'secret')
    // console.log(token)
    //withCredentials = true on the client side (http)
    res.cookie('jwt', token,{
        httpOnly: true,
        maxAge: 24 * 60 * 60 * 1000,
        sameSite: 'lax'
    })
    console.log('cookie envoyé')
    user.update({
            token: token
        })
        const {password, ...data} = await user.toJSON()
    res.send({
        token: token,
        user: {
            id: user.id,
            fullname: user.fullname,
            email: user.email,
            role: user.role 
        }
    })
}

exports.auth = async (req, res) => {
    console.log('cookies reçus :', req.cookies)
    try {
        const cookie = req.cookies['jwt']
        const claims = jwt.verify(cookie, 'secret')

        if (!claims) {
            return res.status(401).send({
                message: 'unauthenticated'
            })
        }

        const user = await User.findOne({ where: { id: claims.id } })
        if (!user) {
            return res.status(404).send({ message: 'User not found' })
        }
        const { password, ...data } = await user.toJSON()
        res.send(data)

    } catch (e) {
        return res.status(401).send({
            message: 'unauthenticated'
        })
    }
}

exports.logout = async (req, res) => {
    res.cookie('jwt', '', {maxAge: 0})

    res.send({
        message: 'success'
    })
}

exports.deleteOne = async (req, res) => {
  try {
    const id = req.params.id
    const deleted = await User.destroy({ where: { id } })
    if (deleted) {
      res.send({ message: 'Utilisateur supprimé avec succès' })
    } else {
      res.status(404).send({ message: 'Utilisateur non trouvé' })
    }
  } catch (error) {
    res.status(500).send({ message: 'Erreur serveur', error })
  }
}
