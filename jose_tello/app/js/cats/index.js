module.exports = function(app) {
  require('./controllers/cats_controller')(app);
  require('./directives/cats_display')(app);
  require('./directives/cats_form')(app);
};
