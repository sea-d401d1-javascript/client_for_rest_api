'use strict';
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

var studentSchema = new mongoose.Schema({
  name: String,
  age: Number,
  major: { type: String, default: 'Undeclared'},
  cell_number: { 
    type: Number,
    validate: {
      validator: function(v) {
        return /d{3}-d{3}-d{4}/.test(v);
      },
      message: '{VALUE} is not a valid phone number!'
    }
  }
});

module.exports = exports = mongoose.model('Student', studentSchema);
