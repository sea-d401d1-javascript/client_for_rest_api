module.exports = function(app) {
  require('./controllers/beers_controller')(app);
  require('./directives/beer_display_directive')(app);
  require('./directives/beer_form_directive')(app);
};
