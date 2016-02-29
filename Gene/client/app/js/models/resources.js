module.exports = function(app) {
  require('./controllers/teams_controller')(app);
  require('./controllers/players_controller')(app);

};
