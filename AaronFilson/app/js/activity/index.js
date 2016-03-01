module.exports = function(app){
  var actCont = require('./controllers/activity_controller')(app);
  require('./directives/myact_display_directive')(app);

  console.log(" the result of requiring the activity controller : " + actCont);

};
