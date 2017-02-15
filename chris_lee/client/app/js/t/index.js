module.exports = function(app) {
  require('./controllers/t_controller')(app);
  require('./directives/t_display_directive')(app);
  require('./directives/t_form_directive')(app);
};
