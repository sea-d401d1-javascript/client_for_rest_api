const handleSuccess = require(__dirname + '/handle_success');
const handleFailure = require(__dirname + '/handle_failure');

module.exports = exports = function(app) {
  app.factory('dogResource', ['$http', 'petsAuth', function($http, petsAuth) {
    var Resource = function(resourceName) {
      this.resourceName = resourceName;
    };

    Resource.prototype.get = function(callback) {
      $http.get('http://localhost:3000/app' + this.resourceName)
        .then(handleSuccess(callback), handleFailure(callback));
    };

    Resource.prototype.create = function(data, callback) {
      $http({
        method: 'POST',
        url: 'http://localhost:3000/app' + this.resourceName,
        data: data,
        headers: {
          token: petsAuth.getToken()
        }
      })
        .then(handleSuccess(callback), handleFailure(callback));
    };

    Resource.prototype.update = function(data, callback) {
      $http({
        method: 'PUT',
        url: 'http://localhost:3000/app' + this.resourceName + '/' + data._id,
        data: data,
        headers: {
          token: petsAuth.getToken()
        }
      })
        .then(handleSuccess(callback), handleFailure(callback));
    };

    Resource.prototype.delete = function(data, callback) {
      $http({
        method: 'DELETE',
        url: 'http://localhost:3000/app' + this.resourceName + '/' + data._id,
        headers: {
          token: petsAuth.getToken()
        }
      })
        .then(handleSuccess(callback), handleFailure(callback));
    };

    return function(resourceName) {
      return new Resource(resourceName);
    };
  }]);
};
