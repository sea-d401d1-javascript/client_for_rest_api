const express = require('express');
const jsonParser = require('body-parser').json();
const Student = require(__dirname + '/../models/student');
const handleDBError = require(__dirname + '/../lib/handle_db_error');
const jwtAuth = require(__dirname + '/../lib/jwt_auth');

var studentRouter = module.exports = exports = express.Router();

studentRouter.get('/students', (req, res) => {
  Student.find({}, (err, data) => {
    if (err) return handleDBError(err, res);

    res.status(200).json(data);
  });
});

studentRouter.post('/students', jwtAuth, jsonParser, (req, res) => {
  var newStudent = new Student(req.body);
  newStudent.save((err, data) => {
    if (err) return handleDBError(err, res);    

    res.status(200).json(data);
  });
});

studentRouter.put('/students/:id', jwtAuth, jsonParser, (req, res) => {
  var studentData = req.body;
  delete studentData._id;
  Student.update({_id: req.params.id}, studentData, (err) => {
    if (err) return handleDBError(err, res);

    res.status(200).json({msg: 'success'});
  });
});

studentRouter.delete('/students/:id', jwtAuth, (req, res) => {
  Student.remove({_id: req.params.id}, (err) => {
    if (err) return handleDBError(err, res);

    res.status(200).json({msg: 'success'});
  });
});
