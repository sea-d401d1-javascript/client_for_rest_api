const express = require('express');
const app = express();
const mongoose = require('mongoose');

mongoose.connect(process.env.MONGOLAB_URI || 'mongodb://localhost/app_dev');

const ctRouter = require(__dirname + '/routes/ct_routes.js');
const tRouter = require(__dirname + '/routes/t_routes.js');

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', 'http://localhost:5000');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  next();
});

app.use('/api', ctRouter);
app.use('/api', tRouter);

var PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log('Server running on Port: ' + PORT));
