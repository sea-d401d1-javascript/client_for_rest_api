var handleSuccess = function(callback) {
  return function(res) {
    callback(null, res.data);
  }
};

var handleFailure = function(callback) {
  return function(res) {
    callback(res);
  }
};

module.exports = exports = function(app) {
  app.factory('myResource', ['$http', function($http) {
    var Resource = function(resourceName) {
      this.resourceName = resourceName;
    }

// For the Sharks
    Resource.prototype.getAll = function(callback) {
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
//end of sharks

// For the People
    Resource.prototype.getAllPeople = function(callback) {
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
//end of people


    return function(resourceName) {
      return new Resource(resourceName);
    }
  }])
}
