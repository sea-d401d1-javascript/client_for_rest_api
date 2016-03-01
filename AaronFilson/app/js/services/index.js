module.exports = function(app) {
  require('./resource_service')(app);
  console.log(' in the services require file index');
};
