//Big ol' constructor function
//Do these need to be declared twice?

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

module.exports = exports = function(app) {
              //Name of Factory
  app.factory('cfResource' , ['$http' , function($http) {
    var Resource = function(resourceName) {
      this.name = resourceName;
    };

    Resource.prototype.getAll = function(callback) {
      $http.get('http://localhost:5000/api' + this.name)
        .then( handleSuccess(callback) , handleFailure(callback) );
    };

    Resource.prototype.post = function(data , callback) {
      $http.post('http://localhost:5000/api' + this.name , data)
        .then( handleSuccess(callback) , handleFailure(callback) );
    };

    Resource.prototype.put = function(data , callback) {
      $http.put('http://localhost:5000/api'  + this.name + '/' + data._id , data)
        .then( handleSuccess(callback) , handleFailure(callback) );
    };

    Resource.prototype.delete = function(data , callback) {
      $http.delete('http://localhost:5000/api' + this.name + '/' + data._id)
        .then( handleSuccess(callback) , handleFailure(callback) );
    };

    return function(resourceName){
      return new Resource(resourceName);
    };

  }]);
}
