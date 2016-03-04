module.exports = function(app) {
  require('./controllers/movies_controller')(app);
  require('./directives/movie_edit_directive')(app);
  require('./directives/movie_form_directive')(app);
};
