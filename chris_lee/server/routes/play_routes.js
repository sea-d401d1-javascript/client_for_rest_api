const express = require('express');
const CT = require(__dirname + '/../models/ct_model.js');
const jsonParser = require('body-parser').json();
const handleDBError = require(__dirname + '/../lib/handle_db_error.js');
const jwtAuth = require(__dirname + '/../lib/jwt_auth');

var playRouter = module.exports = exports = express.Router();

playRouter.route('/play', (req, res) => {

})
