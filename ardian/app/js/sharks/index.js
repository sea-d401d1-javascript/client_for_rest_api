module.exports = function(app) {
  require('./controllers/sharks_controller')(app);

  require('./directives/sharks_display_directive')(app);
  require('./directives/sharks_form_directive')(app);
};
