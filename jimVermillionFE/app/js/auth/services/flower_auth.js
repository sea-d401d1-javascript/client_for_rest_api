module.exports = function(app) {
  app.factory('flowerAuth', ['$http', '$window', function($http, $window) {
    // make some vars for token and user
    var token;
    var user;
    var auth = {
      createUser: function(user, cb) {
        // if no callback use an empty function
        cb  =  cb || function(){};
        console.log(user);
        // post to signup
        $http.post('http://localhost:3000/api/signup', user)
        // store the token given back in local storage
          .then(function(res) {
            token = $window.localStorage.token = res.data.token;
            console.log('token from signup: ' + $window.localStorage.token);

            cb(null);
          }, function(res) { // give back the error
            console.log(res);
            cb(res.err);
          });
      },
      signIn: function(user, cb){
        // if no callback use an empty function
        cb  =  cb || function(){};
        console.log(user);
        // post to signup
        $http({
          url: 'http://localhost:3000/api/signin', 
          method: 'GET',
          headers: {
            'Authorization': 'Basic ' + btoa((user.email + ':' + user.password))
            }
          })
          // store the token given back in local storage
          .then(function(res) {

            token = $window.localStorage.token = res.data.token;
            console.log('here is the token from signin' + $window.localStorage.token);

            cb(null);
          }, function(res) { // give back the error
            console.log(res);
            cb(res.err);
          });  
      },
      getToken: function() {

        token = token || $window.localStorage.token;
        console.log('get token ' + token);

        return token;
      },
      signOut: function(cb) {
        console.log('here in signout');

        $window.localStorage.token = null;
        token = null;
        user = null;
        if (cb) cb();
      },
      getUsername: function(cb) {
        cb = cb || function(){};
        $http({
          method: 'GET',
          url: 'http://localhost:3000/api/currentuser',
          headers: {
            token: auth.getToken()
          }
        })
        .then(function(res) {
          console.log('get username: ');
          console.log(res);

          user = res.data.username; 
          cb(res);
        },function(res) {
          cb(res);
        });
      },
      username: function(){
        if (!user) auth.getUsername();
        return user;
      }
    };
    return auth;
  }]);
};

