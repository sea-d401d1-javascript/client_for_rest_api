module.exports = function(politiciansApp) {
  require('./controllers/politicians_controller')(politiciansApp);

  // require('./directives/politician_display_directive')(politiciansApp);
  require('./directives/politician_form_directive')(politiciansApp);
  require('./directives/header_logo_directive')(politiciansApp);
  require('./directives/footer_copyright_directive')(politiciansApp);
  require('./directives/redblue_color_directive')(politiciansApp);
};
