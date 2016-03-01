module.exports = function(app){
  require('./controllers/activity_controller')(app);
  require('./directives/myact_display_directive')(app);
};
