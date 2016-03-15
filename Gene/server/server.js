const express = require('express');
const app = express();
const mongoose = require('mongoose');

mongoose.connect(process.env.MONGOLAB_URI || 'mongodb://localhost/localdb');

const teamsRouter = require(__dirname + '/routes/team_routes');
const playersRouter = require(__dirname + '/routes/player_routes');

app.use((req,res,next) => {
  res.header('Access-Control-Allow-Origin', 'http://localhost:3000');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  next();
});

app.use('/api', teamsRouter);
app.use('/api', playersRouter);

module.exports = exports = app.listen(4000, () => {
  console.log('server up on port 4000');
});
