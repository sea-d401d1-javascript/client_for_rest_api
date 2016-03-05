var handleSuccess = function(callback) {
  return function(res) {
    callback(null, res.data);
  };
};

var handleFailure = function(callback) {
  return function(res) {
    callback(res);
  };
};

//these modules process the HTTP ............

module.exports = exports = function(app) {
  app.factory('Resource', ['$http', 'politicianAuth', function($http, politicianAuth) {
    var Resource = function(resourceName) {
      this.resourceName = resourceName;
    };

    Resource.prototype.getDem = function(callback) {
      $http.get('http://localhost:3000/api' + this.resourceName)
        .then(handleSuccess(callback), handleFailure(callback));
    };
    Resource.prototype.getRep = function(callback) {
      $http.get('http://localhost:3000/api' + this.resourceName)
        .then(handleSuccess(callback), handleFailure(callback));
    };

    Resource.prototype.create = function(data, callback) {
      $http({
        method: 'POST',
        url: 'http://localhost:3000/api' + this.resourceName,
        data: data,
        headers: {
          token: politicianAuth.getToken()
        }
      })
        .then(handleSuccess(callback), handleFailure(callback));
    };

    Resource.prototype.update = function(data, callback) {
      $http({
        method: 'PUT',
        url: 'http://localhost:3000/api' + this.resourceName + '/' + data._id,
        data: data,
        headers: {
          token: politicianAuth.getToken()
        }
      })
        .then(handleSuccess(callback), handleFailure(callback));
    };

    Resource.prototype.delete = function(data, callback) {
      $http({
        method: 'DELETE',
        url: 'http://localhost:3000/api' + this.resourceName + '/' + data._id,
        data: data,
        headers: {
          token: politicianAuth.getToken()
        }
      })
        .then(handleSuccess(callback), handleFailure(callback));
    };

    return function(resourceName) {
      return new Resource(resourceName);
    };
  }]);
};
