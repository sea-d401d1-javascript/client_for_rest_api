const express = require('express');
const User = require(__dirname + '/../models/user');
const jsonParser = require('body-parser').json();
const handleError = require(__dirname + '/../lib/handle_error');
const basicHTTP = require(__dirname + '/../lib/basic_http');
const saveUserDB = require(__dirname + '/../lib/save_new_user');
const jwtAuth = require(__dirname + '/../lib/jwt_auth');

var authRouter = module.exports = exports = express.Router();

authRouter.post('/signup', jsonParser, (req, res) => {
  console.log(req.body);

  if(!((req.body.email || '').length)) return res.status(400).json({msg:'Please enter a email'});
  // include email validation in a module and export true or false

  if(!((req.body.username || '').length)) return res.status(400).json({msg: 'Please enter a user name'});

  if(!((req.body.password || '').length > 7)) return  res.status(400).json({msg: 'Please enter password larger than 7 characters'});

  if (!(req.body.password === req.body.comfirmpassword)) return res.status(400).json( { msg: 'Passwords are not the same' } );


  User.find({$or : [{'username':req.body.username},{'email':req.body.email}]}, (err, data) => {
    if(err) return handleError(err,res);
    if(data.length) return res.status(400).json({msg:'user already exist; plese sign in this site'});
    saveUserDB(req,res);
  });
});

authRouter.get('/signin', basicHTTP, (req, res) => {
  User.findOne({'authentication.email':req.basicHTTP.email}, (err, user) => {
    if (err) handleError(err,res);

    if(!user) return res.status(401).json({msg: 'user does not exist; please sign up this site first'});

    if(!user.comparePassword(req.basicHTTP.password)) return res.status(401).json({msg: 'incorrect password. please enter again'});

    console.log(user._id);
    res.status(200).json({token: user.generateToken()});

  });
});

authRouter.get('/currentuser', jsonParser, jwtAuth, (req, res) => {
  User.findOne({_id: req.user._id}, (err, data) => {
    if(err) handleError(err,res);

    res.json({username: data.username});
  });
});
