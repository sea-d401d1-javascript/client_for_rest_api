const express = require('express');
const CT = require(__dirname + '/../models/ct_model.js');
const jsonParser = require('body-parser').json();
const handleDBError = require(__dirname + '/../lib/handle_db_error.js');

var ctRouter = module.exports = exports = express.Router();

ctRouter.get('/ct', (req, res) => {
  CT.find({}, (err, data) => {
    if (err) return handleDBError(err, res);
    res.status(200).json(data);
  });
});
ctRouter.post('/ct', jsonParser, (req, res) => {
  var newCT = new CT(req.body);
  newCT.save((err, data) => {  // save new T to database
    if (err) return handleDBError(err, res);
    res.status(200).json(data);
  });
});
ctRouter.put('/ct/:id', jsonParser, (req, res) => {
  var newData = req.body;
  delete newData._id;
  CT.update({_id: req.params.id}, newData, (err) => {
    if (err) return handleDBError(err, res);
    res.status(200).json({msg: 'Successfully updated CT'});
  });
});
ctRouter.delete('/ct/:id', jsonParser, (req, res) => {
  CT.remove({_id: req.params.id}, (err) => {
    if (err) return handleDBError(err, res);
    res.status(200).json({msg: 'Successfully deleted CT'});
  });
});
