'use strict';
const express = require('express');
const app = module.exports = exports = express();
const mongoose = require('mongoose');
mongoose.connect(process.env.MONGOLAB_URI || 'mongodb://localhost/students_app_dev');

const studentsRouter = require(__dirname + '/routes/students_routes');
const classesRouter = require(__dirname + '/routes/classes_routes');

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', 'http://localhost:5000');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  next();
});

app.use('/api', studentsRouter);
app.use('/api', classesRouter);

var PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log('Yo! Server up on port: ' + PORT));
