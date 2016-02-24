module.exports = function(app) {
  require('./controllers/sithlords_controller')(app);

  require('./directives/sith_display_directive')(app);
};
