module.exports = function(app) {
  // require('./cat_service')(app);
  // require('./dog_service')(app);
  require('./resource_service')(app, 'catResource');
  require('./resource_service')(app, 'dogResource');
};
