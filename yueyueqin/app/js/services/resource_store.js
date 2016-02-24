module.exports = function (app) {
  app.factory('resourceStore',function() {
    var data = {};
    return{
      get: function(key){
        return data[key];
      },
      set: function(key, value) {
        data[key] = value;
        return value;
      }
    };
  });
};
