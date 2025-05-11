const db = require('../models') 
const Jeu = db.jeu

exports.findAll = (req, res) => {
   console.log('Requête reçue pour récupérer tous les jeux');
   Jeu.findAll()
   .then(data => {
       console.log('Données récupérées:', data); // Add this log
       res.send(data);
   })
   .catch(err => {
       console.error('Erreur détaillée:', err); // Add this log
       res.status(500).send({
           message: err.message || 'Une erreur est survenue lors de la récupération des jeux'
       });
   });
};

exports.create = (req, res) => {
   if(!req.body.name) {
       res.status(400).send({
           message: 'The name is mandatory'
       })
       return;
   }
   Jeu.create(req.body)
   .then(data => {
       res.send(data)
   })
   .catch(err => {
       res.status(500).send({
           message: 'Could not insert the data'
       })
   })
}

exports.findOne = (req, res) => {
   const id = req.params.id
   Jeu.findByPk(id)
   .then(data => {
       res.send(data)
   })
   .catch(err => {
       res.status(500).send({
           message:
           err.message || 'Some error occured'
       })
   })
}

exports.update = (req, res) => {
   const id = req.params.id
   Jeu.update(req.body, {
       where: {id: id}
   })
   .then(num => {
       if (num == 1){
           res.send({
               message: 'jeu updated'
           })
       }else{
           res.send({
               message: 'jeu not found'
           })
       }
   })
   .catch(err => {
       res.status(500).send({
           message:
           err.message || 'Some error occured'
       })
   })
}

exports.delete = (req, res) => {
   const id = req.params.id
   Jeu.destroy({
       where: {id: id}
   })
   .then(num => {
       if (num == 1){
           res.send({
               message: 'jeu deleted'
           })
       }else{
           res.send({
               message: 'jeu not found'
           })
       }
   })
   .catch(err => {
       res.status(500).send({
           message:
           err.message || 'Some error occured'
       })
   })
}