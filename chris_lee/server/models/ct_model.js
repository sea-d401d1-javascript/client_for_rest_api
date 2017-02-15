const mongoose = require('mongoose');
const validate = require('mongoose-validator');

var nameValidator = [
  validate({
    validator: 'isLength',
    arguments: [2, 50],
    message: 'Name should be between {ARGS[0]} and {ARGS[1]} characters'
  })
  // validate({
  //   validator: 'isAlphanumeric',
  //   passIfEmpty: true,
  //   message: 'Name should contain alpha-numeric characters only'
  // })
];

var counter = new mongoose.Schema({
  name: {type: String, required: true, validate: nameValidator},
  organization: {type: String, required: true, default: 'SEAL Team 6', validate: nameValidator},
  rifle: {type: String, required: true, default: 'M4A1', validate: nameValidator},
  pistol: {type: String, required: true, default: 'USP', validate: nameValidator},
  grenade: {type: String, required: true, default: 'Flashbang', validate: nameValidator},
  ctID: String
});

module.exports = exports = mongoose.model('CT', counter);
