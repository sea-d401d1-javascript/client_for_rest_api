var handleSuccess = function(callback) {
  return function(res) {
    callback(null,res.data);
  };
};

var handleFailure = function(callback) {
  return function(res) {
    callback(res);
  };
};

module.exports = function(app) {
  app.factory('twoResource',['$http', 'userAuth', function($http, userAuth) {
    var Resource = function(ResourceName){
      this.ResourceName = ResourceName;
    };

    Resource.prototype.getAll = function(callback){
      $http({
        method: 'GET',
        url: 'http://localhost:3000/api' + this.ResourceName,
        headers: {
          token: userAuth.getToken()
        }
      }).then(handleSuccess(callback), handleFailure(callback));
    };

    Resource.prototype.create = function(data,callback) {
      $http({
        method: 'POST',
        url: 'http://localhost:3000/api' + this.ResourceName,
        data: data,
        headers: {
          token: userAuth.getToken()
        }
      })
        .then(handleSuccess(callback), handleFailure(callback));
    };

    Resource.prototype.update = function(data, callback) {
      $http({
        method: 'PUT',
        url: 'http://localhost:3000/api' + this.ResourceName + '/' + data._id,
        data: data,
        headers: {
          token: userAuth.getToken()
        }
      })
        .then(handleSuccess(callback), handleFailure(callback));
    };

    Resource.prototype.delete = function(data, callback) {
      $http({
        method: 'DELETE',
        url: 'http://localhost:3000/api' + this.ResourceName + '/' + data._id,
        headers: {
          token: userAuth.getToken()
        }
      })
       .then(handleSuccess(callback), handleFailure(callback));
    };

    return function(ResourceName) {
      return new Resource(ResourceName);
    };
  }]);
};
