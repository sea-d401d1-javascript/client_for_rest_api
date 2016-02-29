module.exports = function(app) {
  require('./controllers/actors_controller')(app);
  // require('./directives/actor_display_directive')(app);
  // require('./directives/actor_form_directive')(app);
};
