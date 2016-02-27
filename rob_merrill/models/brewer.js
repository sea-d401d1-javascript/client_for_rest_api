'use strict';

const mongoose = require('mongoose');

var brewerSchema = new mongoose.Schema({
  name: String,
  age: Number
});

module.exports = exports = mongoose.model('Brewer', brewerSchema);
