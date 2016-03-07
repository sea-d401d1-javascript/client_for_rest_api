module.exports = function(app) {
  require('./poly_store')(app);
  require('./resource_service')(app);
};
