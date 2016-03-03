module.exports = function(app) {
  app.factory('flowerAuth', ['$http', '$window', function($http, $window) {
    // make some vars for token and user
    var token;
    var user;
    return {
      createUser: function(user, cb) {
        // if no callback use an empty function
        cb  =  cb || function(){};
        console.log(user);
        // post to signup
        $http.post('http://localhost:3000/api/signup', user)
        // store the token given back in local storage
          .then(function(res) {
            token = $window.localStorage.token = res.data.token;
            cb(null);
          }, function(res) { // give back the error
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
