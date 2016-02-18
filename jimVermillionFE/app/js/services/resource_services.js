var handleSuccess = function(callback) {
  return function(res){
    callback(null, res.data);
  };
};

var handleFailure = function(callback) {
  return function(res) {
    callback(res);
  };
};

module.exports = exports = function(app) {
  app.factory('Resource', ['$http', function($http){ // singleton -- object that can only be made once -- gets pointed to
    var Resource = function(resourceName){
      this.resourceName = resourceName;
    };

    Resource.prototype.get = function(callback) {
      $http.get('http://localhost:3000/' + this.resourceName)
        .then(handleSuccess(callback), handleFailure(callback));
    };

    Resource.prototype.create = function(data, callback) {
      $http.post('http://localhost:3000/' + this.resourceName, data)
        .then(handleSuccess(callback), handleFailure(callback));
    };

    Resource.prototype.delete = function(data, callback) {
      $http.delete('http://localhost:3000/' + this.resourceName + '/' + data._id)
        .then(handleSuccess(callback), handleFailure(callback));
    };

    Resource.prototype.update = function(data, callback) {
      $http.put('http://localhost:3000/' + this.resourceName + '/' + data._id, data)
        .then(handleSuccess(callback), handleFailure(callback));
    };

    return function(resourceName){
      return new Resource(resourceName);
    };
  }]);
}