module.exports = function(app) {
  require('./services/resources_services')(app);
  require('./controllers/two_resources_controller')(app);
  require('./directives/movie_edit_directive')(app);
  require('./directives/movie_form_directive')(app);  
  require('./directives/actor_edit_directive')(app);
};
