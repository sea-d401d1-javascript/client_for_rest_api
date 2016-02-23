'use strict';

const express = require('express');
const jsonParser = require('body-parser').json();
const Brewer = require(__dirname + '/../models/brewer');
const handleDBError = require(__dirname + '/../lib/handle_db_error');
const jwtAuth = require(__dirname + '/../lib/jwtAuth');

var brewerRouter = module.exports = exports = express.Router();

brewerRouter.get('/brewers', (req, res) => {
  Brewer.find({}, (err, data) => {
    if (err) return handleDBError(err, res);
    res.status(200).json(data);
  });
});

brewerRouter.get('/mybrewers', jwtAuth, (req, res) => {
  Brewer.find({ brewer: req.user._id }, (err, data) => {
    if (err) return handleDBError(err, res);
    rest.status(200).json(data);
  });
});

brewerRouter.post('/brewers', jsonParser, (req, res) => {
  var newBrewer = new Brewer(req.body);
  newBrewer.save((err, data) => {
    if (err) return handleDBError(err, res);
    res.status(200).json(data);
  });
});

brewerRouter.put('/brewers/:id', jsonParser, (req, res) => {
  var updateBrewerData = req.body;
  delete updateBrewerData._id;
  brewer.update({_id: req.params.id}, updateBrewerData, (err) => {
    if (err) return handleDBError(err, res);
    res.status(200).json({updateBrewerData});
  });
});

brewerRouter.delete('/brewers/:id', (req, res) => {
  Brewer.remove({_id: req.params.id}, (err) => {
    if (err) return handleDBError(err, res);
    res.status(200).json({msg: 'success'});
  });
});
