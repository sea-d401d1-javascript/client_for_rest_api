module.exports = function(app) {
  require('./services/auth_service')(app);
  require('./controllers/auth_controller')(app);
  require('./controllers/signin_controller')(app);
  require('./controllers/signup_controller')(app);
}
