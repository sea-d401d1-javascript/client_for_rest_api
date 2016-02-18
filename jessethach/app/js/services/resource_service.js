var handleSuccess = (callback) => {
  return function(res) {
    callback(null, res.data);
  }
};

var handleFailure = (callback) => {
  return function(res) {
    callback(res);
  }
};

module.exports = exports = (app) => {

  app.factory('Resource', ['$http', ($http) => {
    var Resource = function(resourceName) {
      this.resourceName = resourceName;
    }

    Resource.prototype.getAll = (callback) => {
      $http.get('http://localhost:3000/api' + this.resourceName)
        .then(handleSuccess(callback), handleFailure(callback));
    };

    Resource.prototype.create = function(data, callback) {
      $http.post('http://localhost:3000/api' + this.resourceName, data)
        .then(handleSuccess(callback), handleFailure(callback));
    };

    Resource.prototype.update = function(data, callback) {
      $http.put('http://localhost:3000/api' + this.resourceName + '/' + data._id, data)
        .then(handleSuccess(callback), handleFailure(callback));
    };

    Resource.prototype.delete = function(data, callback) {
      $http.delete('http://localhost:3000/api' + this.resourceName + '/' + data._id)
        .then(handleSuccess(callback), handleFailure(callback));
    };

    return (resourceName) => {
      return new Resource(resourceName);
    }
  }])
}
