module.exports = function(app) {
  require('./controllers/people_controller')(app);

  require('./directives/people_display_directive')(app);
  require('./directives/people_form_directive')(app);
};
