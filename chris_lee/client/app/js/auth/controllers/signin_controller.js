module.exports = function(app) {
  app.controller('SigninController', ['$scope', '$location', 'csAuth', function($scope, $location, csAuth) {
    $scope.submit = function(user) {
      csAuth.signIn(user, function() {
        $scope.updateUsername();
        $location.path('/home');
      });
    };
  }]);
}
