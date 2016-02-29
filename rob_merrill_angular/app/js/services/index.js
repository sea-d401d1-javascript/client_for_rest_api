module.exports = function(app) {
  require('./store')(app);
  require('./resource_service')(app);
};
