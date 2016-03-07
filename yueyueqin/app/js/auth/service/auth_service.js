module.exports = function(app) {
  app.factory('userAuth', ['$http', '$window', function($http, $window){
    var token;
    var auth = {};
    auth.getToken = function() {
      token = token || $window.localStorage.token;
      return token;
    };

    auth.signIn = function(input, callback) {
      callback = callback || function() {};
      $http({
        method: 'GET',
        url: 'http://localhost:3000/api/signin',
        headers: {
          'Authorization': 'Basic ' + btoa((input.email + ':' + input.password))
        }
      }).then(function(res) {
        token = res.data.token;
        $window.localStorage.token = token;
        callback(null,res);
      }, function(res) {
        console.log(res);
        callback(res);
      });

    };

    auth.createUser = function(input, callback) {
      callback = callback || function() {};
      console.log(input);
      $http.post('http://localhost:3000/api/signup',input)
        .then(function(res) {
          console.log(res.data.token);
          token = res.data.token;
          $window.localStorage.token = token;
          callback(null, res);
        }, function(res){
          console.log(res);
          callback(res);
        });
    };
    auth.getUsername = function(callback) {
      callback = callback || function() {};
      $http({
        method: 'GET',
        url: 'http://localhost:3000/api/currentuser',
        headers: {
          token: auth.getToken()
        }
      }).then(function(res){
        callback(null,res);
      },function(res){
        callback(res);
      });
    };
    auth.signOut = function(callback) {
      $window.localStorage.token = null;
      token = null;
      if(callback) callback();
    };
    return auth;
  }]);
};
