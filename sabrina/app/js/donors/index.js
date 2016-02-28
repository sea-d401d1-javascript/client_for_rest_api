module.exports = function(app) {
  require('./controllers/donors_controller')(app);
  require('./directives/donor_display_directive')(app);
};
