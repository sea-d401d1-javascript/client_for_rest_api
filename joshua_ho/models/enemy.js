const mongoose = require('mongoose');

enemySchema = new mongoose.Schema({
  name: {type:String, required:true},
  gender: {type:String, default:'Female'},
  age: {type:Number, default:21},
  relationship: {type: String , default:'Worst'},
  hatesJosh: {type:Boolean , default:true}
});

module.exports = exports = mongoose.model('Enemy' , enemySchema);
