//Framework
const express = require('express');

//Middleware
const dbError = require(__dirname + '/../lib/handleServerError');
const bodyParser = require('body-parser').json();
//Mongoose
const mongoose = require('mongoose');
const Friend = require( __dirname + '/../models/friend');


var friendRouter = module.exports = exports = express.Router();
//We need to use auth.routes to direct users to this route

friendRouter.route('/friends')
  .get( (req , res) => {
    Friend.find( {} , (err , data) => {
      if(err) return dbError(err , res);
      res.msg = 'Sent a list of your friends.'; //Why can't I get this?
      res.status(200).json(data);
    });
  })
  .post( bodyParser , (req, res) => {
    var newFriend = new Friend(req.body);
    newFriend.save( (err , data) => {
      if(err) return dbError(err , res);
      res.status(200).json( newFriend );
    });
  })

friendRouter.put('/friends/:id', bodyParser , (req, res) => {
  var friendData = req.body;
  delete friendData._id;
  Friend.update({_id: req.params.id} , friendData , (err, data) => {
    if(err) return dbError(err , res);
    res.status(200).json({'msg':'Updated your friend.'});
  });
});

friendRouter.delete('/friends/:id', (req, res) => {
  Friend.remove({_id: req.params.id} , (err) => {
    if(err) return dbError(err , res);
    res.status(200).json({'msg':'Deleted your friend. :[ '});
  });
})
