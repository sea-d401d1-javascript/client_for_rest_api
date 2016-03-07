const express = require('express');
const app = module.exports = exports = express();
const mongoose = require('mongoose');
mongoose.connect(process.env.MONGOLAB_URI || 'mongodb://localhost/politicians_app_dev');

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', 'http://localhost:5000');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, token');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  next();
});

const demRouter = require(__dirname + '/routes/dem_routes');
const repRouter = require(__dirname + '/routes/rep_routes');
const authRouter = require(__dirname + '/routes/auth_routes');
const userRouter = require(__dirname + '/routes/user_routes');

app.use('/api', demRouter);
app.use('/api', repRouter);
app.use('/api', authRouter);
app.use('/api', userRouter);

var PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log('server up on port: ' + PORT));
