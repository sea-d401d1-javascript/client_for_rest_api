module.exports = function(app) {
  //Controllers first
  require('./controllers/enemy_controller')(app);
  //Then Directives
  require('./directives/enemy_display_directive')(app);
  require('./directives/enemy_post_form_directive')(app);
};
