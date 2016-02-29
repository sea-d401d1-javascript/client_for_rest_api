module.exports = function(app) {
  require('./controllers/beers_controller')(app);
  require('./directives/beer_display_directive')(app);
  require('./directives/beer_form_directive')(app);
  // require('./controllers/brewers_controller')(app);
  // require('./directives/brewer_display_directive')(app);
  // require('./directives/brewer_form_directive')(app);
};
