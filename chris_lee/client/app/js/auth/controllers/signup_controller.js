module.exports = function(app) {
  app.controller('SignupController', ['$scope', '$location', 'csAuth', function($scope, $location, csAuth) {
    $scope.signup = true;
    $scope.submit = function(user) {
      csAuth.createUser(user, function() {
        $scope.updateUsername();
        $location.path('/home');
      });
    };
  }]);
}
