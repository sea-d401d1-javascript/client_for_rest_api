//Framework
const express = require('express');
const app = module.exports = exports = express();
const mongoose = require('mongoose');
//Routes
const friendRouter = require( __dirname + '/routes/friendRoutes.js');
const enemyRouter = require( __dirname + '/routes/enemyRoutes.js');

mongoose.connect(process.env.MONGOLAB_URI || 'mongodb://localhost/friends_app_dev');

var PORT = 5000;

//Adding routes
app.use('/api' , friendRouter);
app.use('/api' , enemyRouter); //To-Be Added
app.use(
  express.static( __dirname + '/build')
).listen(PORT , () => {
  console.log('Server is running on port ' + PORT + '.');
});
