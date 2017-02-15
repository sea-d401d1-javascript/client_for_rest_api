const express = require('express');
const T = require(__dirname + '/../models/t_model.js');
const jsonParser = require('body-parser').json();
const handleDBError = require(__dirname + '/../lib/handle_db_error.js');

var tRouter = module.exports = exports = express.Router();

tRouter.get('/t', (req, res) => {
  T.find({}, (err, data) => {
    if (err) return handleDBError(err, res);
    res.status(200).json(data);
  });
});
tRouter.post('/t', jsonParser, (req, res) => {
  var newT = new T(req.body);
  newT.save((err, data) => {  // save new T to database
    if (err) return handleDBError(err, res);
    res.status(200).json(data);
  });
});
tRouter.put('/t/:id', jsonParser, (req, res) => {
  var newData = req.body;
  delete newData._id;
  T.update({_id: req.params.id}, newData, (err) => {
    if (err) return handleDBError(err, res);
    res.status(200).json({msg: 'Successfully updated T'});
  });
});
tRouter.delete('/t/:id', jsonParser, (req, res) => {
  T.remove({_id: req.params.id}, (err) => {
    if (err) return handleDBError(err, res);
    res.status(200).json({msg: 'Successfully deleted T'});
  });
});
