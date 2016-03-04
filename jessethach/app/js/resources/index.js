module.exports = function(app) {
  require('./controllers/jedis_controller')(app);

  require('./directives/jedi_display_directive')(app);
  require('./directives/jedi_form_directive')(app);
  require('./directives/sith_display_directive')(app);
  require('./directives/sith_form_directive')(app);
};
