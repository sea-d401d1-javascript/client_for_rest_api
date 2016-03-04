module.exports = function(app) {
  require('./controllers/actors_controller')(app);
  require('./directives/actor_edit_directive')(app);
  // require('./directives/actor_form_directive')(app);
};
