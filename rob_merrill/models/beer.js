'use strict';

const mongoose = require('mongoose');

var beerSchema = new mongoose.Schema({
  name: String,
  style: String,
  ibu: Number
});

module.exports = exports = mongoose.model('Beer', beerSchema);
