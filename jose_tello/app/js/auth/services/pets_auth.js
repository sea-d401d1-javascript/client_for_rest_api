module.exports = function(app) {
  app.factory('petsAuth', ['$http', '$window', function($http, $window) {
    var token;
    var user;
    return {
      createUser: function(user, cb) {
        console.log('inside createUser function in petsAuth');
        cb = cb || function() {};
        $http.post('http://localhost:3000/app/signup', user)
          .then(function(res) {
            token = $window.localStorage.token = res.data.token;
            cb(null);
          }, function(res) {
            console.log(res);
            cb(res.err);
          });
      },
      getToken: function() {
        token = token || $window.localStorage.token;
        return token;
      }
    };
  }]);
};
