module.exports = function(app) {
  require('./cat_service')(app);
  require('./dog_service')(app);
};
