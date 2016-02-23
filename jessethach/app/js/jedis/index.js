module.exports = function(app) {
  require('./controllers/jedis_controller')(app);
};
