module.exports = function(app) {
  require('./controllers/ct_controller')(app);
  require('./directives/ct_display_directive')(app);
  require('./directives/ct_form_directive')(app);
  require('./directives/t_display_directive')(app);
  require('./directives/t_form_directive')(app);
};
