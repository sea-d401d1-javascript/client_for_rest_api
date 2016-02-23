'use strict';

const mongoose = require('mongoose');

var brewerSchema = new mongoose.Schema({
  name: String,
  age: String
});

module.exports = exports = mongoose.model('Brewer', brewerSchema);
