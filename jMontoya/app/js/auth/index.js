module.exports = function(app) {
  require('./services/politician_auth')(app);
  require('./controllers/signup_controller')(app);
  require('./controllers/signin_controller')(app);
};
