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
  app.factory('Resource', ['$http', 'flowerAuth', function($http, flowerAuth){
    var Resource = function(resourceName){
      this.resourceName = resourceName;
    };

    Resource.prototype.get = function(callback) {
      $http({
        url: 'http://localhost:3000/' + this.resourceName,
        method: 'GET',
        headers: {
          token: flowerAuth.getToken()
        }
      })
        .then(handleSuccess(callback), handleFailure(callback));
    };

    Resource.prototype.create = function(data, callback) {
      $http({
        url: 'http://localhost:3000/' + this.resourceName,
        method: 'POST',
        data: data,
        headers: {
          token: flowerAuth.getToken()
        }
      })
        .then(handleSuccess(callback), handleFailure(callback));
    };

    Resource.prototype.delete = function(data, callback) {
      $http({
        method: 'DELETE',
        url: 'http://localhost:3000/' + this.resourceName + '/' + data._id,
        headers: {
          token: flowerAuth.getToken()
        }
      })
        .then(handleSuccess(callback), handleFailure(callback));
    };

    Resource.prototype.update = function(data, callback) {
      $http({
        method: 'PUT',
        url: 'http://localhost:3000/' + this.resourceName + '/' + data._id, 
        data: data,
        headers: {
          token: flowerAuth.getToken()
        }
      })
        .then(handleSuccess(callback), handleFailure(callback));
    };

    return function(resourceName){
      return new Resource(resourceName);
    };
  }]);
}
