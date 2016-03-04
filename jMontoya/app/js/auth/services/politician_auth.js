module.exports = function(app) {
  app.factory('politician', ['$http', '$window', function($http, $window) {
    var token;
    var user;
    return {
      createUser: function(user, cb) {
        cb = cb || function(){};
        $http.post('http://localhost:3000/api/signup', user)
          .then(function(res) {
            token = $window.localStorage.token = res.data.token;
            cb(null);
          }, function(res) {
            console.log(res);
            cb(res.err);
          });
      },
      signIn: function(user, cb) {
        cb = cb || function() {};
        $http({
          method: 'GET',
          url: 'http://localhost:3000/api/signin',
          headers: {
            'Authorization': 'Basic ' + btoa((user.email+ ':' + user.password));
          }
        })
          .then(fun)
      },
      getToken: function() {
        token = token || $window.localStorage.token;
        return token;
      }
    };
  }]);
};
