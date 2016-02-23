'use strict';

const express = require('express');
const jsonParser = require('body-parser').json();
const Brewer = require(__dirname + '/../models/brewer');
const Beer = require(__dirname + '/../models/beer');
const handleDBError = require(__dirname + '/../lib/handle_db_error');

var beersDrankRouter = module.exports = exports = express.Router();

beersDrankRouter.get('/howManyBeers', (req, res) => {
  var brewers = new Promise((resolve) => {
    Brewer.count({}, (err, data) => {
      if (err) return handleDBError(err, res);
      resolve(data);
    });
  });
  var beers = new Promise((resolve) => {
    Beer.count({}, (err, data) => {
      if (err) return handleDBError(err, res);
      resolve(data);
    });
  });
  Promise.all([brewers, beers]).then((vals) => {
    res.send('With the brewers at the brewery we can brew ' + (vals[0] * vals[1]) + ' beers.');
  });
});
