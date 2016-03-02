module.exports = function(app) {
  require('./services/dog_auth')(app);
  require('./services/human_auth')(app);
  require('./controllers/signup_controller')(app);
  require('./controllers/signin_controller')(app);
};
