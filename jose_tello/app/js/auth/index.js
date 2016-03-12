module.exports = function(app) {
  require('./services/pets_auth')(app);
  require('./controllers/signup_controller')(app);
  require('./controllers/signin_controller')(app);
  require('./controllers/auth_controller')(app);
};
