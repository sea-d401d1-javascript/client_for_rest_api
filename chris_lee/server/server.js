const express = require('express');
const app = express();
const mongoose = require('mongoose');

mongoose.connect(process.env.MONGOLAB_URI || 'mongodb://localhost/app_dev');

const ctRouter = require(__dirname + '/routes/ct_routes.js');
const tRouter = require(__dirname + '/routes/t_routes.js');

app.use('/api', ctRouter);
app.use('/api', tRouter);

var PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log('Server running on Port: ' + PORT));
