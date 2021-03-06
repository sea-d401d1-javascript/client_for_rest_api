module.exports = function(app) {
  require('./services/flower_auth')(app);
  require('./controllers/auth_controller')(app);
  require('./controllers/signup_controller')(app);
  require('./controllers/signin_controller')(app);
};
