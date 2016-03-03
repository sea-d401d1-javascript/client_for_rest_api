module.exports = function(app) {
  app.controller('SignupController', ['$scope', '$location', '$politicianAuth', function($scope, $location, auth) {
    $scope.signup = true;
    $scope.submit = function(user) {
      auth.createUser(user, function() {
          $location.path('/home');
      });
    };
  }]);
};
