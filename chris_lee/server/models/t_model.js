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

var terror = new mongoose.Schema({
  name: {type: String, required: true, validate: nameValidator},
  organization: {type: String, required: true, default: 'Phoenix Connection', validate: nameValidator},
  rifle: {type: String, required: true, default: 'AK47', validate: nameValidator},
  pistol: {type: String, required: true, default: 'Glock', validate: nameValidator},
  grenade: {type: String, required: true, default: 'HE', validate: nameValidator},
  bomb: Boolean,
  tID: String
});

module.exports = exports = mongoose.model('T', terror);
