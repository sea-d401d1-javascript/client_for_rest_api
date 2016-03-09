const express = require('express');
const app = module.exports = exports = express();
const mongoose = require('mongoose');
const moviesRouter = require(__dirname + '/routes/movies_routes');
const actorsRouter = require(__dirname + '/routes/actors_routes');
const userRouter = require(__dirname + '/routes/auth_routes');
mongoose.connect(process.env.MONGOLAB_URI||'mongodb://localhost/movies_app_dev');

app.use((req,res,next) => {
  res.header('Access-Control-Allow-Origin', 'http://localhost:5000');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, token');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  next();
});

app.use('/api',moviesRouter);

app.use('/api', actorsRouter);

app.use('/api', userRouter);


var PORT = process.env.PORT || 3000;

app.listen(PORT, () => console.log('server up on port: ' + PORT));
