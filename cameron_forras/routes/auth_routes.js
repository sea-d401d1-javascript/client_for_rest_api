'use strict';
const express = require('express');
const jsonParser = require('body-parser').json();
const Student = require(__dirname + '/../models/student');
const handleDBError = require(__dirname + '/../lib/handle_db_error');
const basicHTTP = require(__dirname + '/../lib/basic_http');

var authRouter = module.exports = exports = express.Router();

authRouter.get('/signin', basicHTTP, (req, res) => {
  Student.findOne({'authentication.email': req.basicHTTP.email}, (err, user) => {
    if (err) return handleDBError(err, res);

    if (!user) return res.status(401).json({msg: 'Invalid username/password'});

    if (!user.comparePassword(req.basicHTTP.password)) return res.status(401).json({msg: 'Invalid username/password'});

    res.json({token: user.generateToken()});
  });
});

authRouter.post('/signup', jsonParser, (req, res) => {
  if (!(req.body.email || '').length) {
    return res.status(400).json({msg: 'Invalid email'});
  }
  if (!((req.body.password || '').length > 7)) {
    return res.status(400).json({msg: 'Please enter a password larger than 7 characters'});
  }
  Student.findOne({'authentication.email': req.body.email}, (err, email) => {
    if (err) return handleDBError(err, res);
    if (email) return res.status(400).json({msg: 'Email taken - enter a new one'});

    var newStudent = new Student();

    newStudent.username = req.body.username || req.body.email;
    newStudent.authentication.email = req.body.email;
    newStudent.hashPassword(req.body.password);
    newStudent.save((err, data) => {
      if (err) return handleDBError(err, res);
      res.status(200).json({token: data.generateToken()});
    });
  });
});
