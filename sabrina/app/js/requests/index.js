module.exports = function(app) {
  require('./controllers/requests_controller')(app);
  require('./directives/request_display_directive')(app);
  require('./directives/request_form_directive')(app);
};
