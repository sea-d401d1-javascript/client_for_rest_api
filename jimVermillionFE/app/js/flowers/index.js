module.exports = function(app) {
  require('./controllers/main_controller')(app);
  require('./directives/flower_display_directive')(app);
  require('./directives/flower_form_directive')(app);
};
