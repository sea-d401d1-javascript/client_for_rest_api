'use strict';

const express = require('express');
const jsonParser = require('body-parser').json();
const Beer = require(__dirname + '/../models/beer');
const handleDBError = require(__dirname + '/../lib/handle_db_error');
const jwtAuth = require(__dirname + '/../lib/jwtAuth');

var beerRouter = module.exports = exports = express.Router();

beerRouter.get('/beers', (req, res) => {
  Beer.find({}, (err, data) => {
    if (err) return handleDBError(err, res);
    res.status(200).json(data);
  });
});

beerRouter.get('/mybeers', jwtAuth, (req, res) => {
  Beer.find({ brewer: req.user._id }, (err, data) => {
    if (err) return handleDBError(err, data);
    res.status(200).json(data);
  });
});

beerRouter.post('/beers', jsonParser, (req, res) => {
  var newBeer = new Beer(req.body);
  newBeer.save((err, data) => {
    if (err) return handleDBError(err, res);
    res.status(200).json(data);
  });
});

beerRouter.post('/mybeers', jwtAuth, jsonParser, (req, res) => {
  var newBeer = new Beer(req.body);
  newBeer.drinker = req.user._id;
  newBeer.save((err, data) => {
    if (err) return handleDBError(err, res);
    res.status(200).json(data);
  });
});

beerRouter.put('/beers/:id', jsonParser, (req, res) => {
  var updateBeerData = req.body;
  delete updateBeerData._id;
  Beer.update({_id: req.params.id}, updateBeerData, (err) => {
    if (err) return handleDBError(err, res);
    res.status(200).json({updateBeerData});
  });
});

beerRouter.delete('/beers/:id', (req, res) => {
  Beer.remove({_id: req.params.id}, (err) => {
    if (err) return handleDBError(err, res);
    res.status(200).json({msg: 'success'});
  });
});
