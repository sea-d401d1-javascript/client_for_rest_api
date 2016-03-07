module.exports = function(app) {
  require('./service/auth_service.js')(app);
  // require('./controllers/auth_controller.js')(app);
  require('./controllers/signup_controller.js')(app);
  require('./controllers/signin_controller.js')(app);
};
