module.exports = function(app) {
  require('./controllers/dogs_controller')(app);
  require('./directives/dogs_display')(app);
  require('./directives/dogs_form')(app);
};
