//Framework
const express = require('express');

//Middleware
const dbError = require(__dirname + '/../lib/handleServerError');
const bodyParser = require('body-parser').json();
//Mongoose
const mongoose = require('mongoose');
const Enemy = require( __dirname + '/../models/enemy');


var enemyRouter = module.exports = exports = express.Router();
//We need to use auth.routes to direct users to this route

enemyRouter.route('/enemies')
  .get( (req , res) => {
    Enemy.find( {} , (err , data) => {
      if(err) return dbError(err , res);
      res.msg = 'Sent a list of your enemys.'; //Why can't I get this?
      res.status(200).json(data);
    });
  })
  .post( bodyParser , (req, res) => {
    var newEnemy = new Enemy(req.body);
    newEnemy.save( (err , data) => {
      if(err) return dbError(err , res);
      res.status(200).json( newEnemy );
    });
  })

enemyRouter.put('/enemies/:id', bodyParser , (req, res) => {
  var enemyData = req.body;
  delete enemyData._id;
  Enemy.update({_id: req.params.id} , enemyData , (err, data) => {
    if(err) return dbError(err , res);
    res.status(200).json({'msg':'Updated your enemy.'});
  });
});

enemyRouter.delete('/enemies/:id', (req, res) => {
  Enemy.remove({_id: req.params.id} , (err) => {
    if(err) return dbError(err , res);
    res.status(200).json({'msg':'Deleted your Enemy. :)  '});
  });
})
