module.exports = function(app) {
  app.controller('SignupController', ['$scope', '$location', 'flowerAuth', function($scope, $location, flowerAuth) {
    $scope.signup = true;
    $scope.submit = function(user) {
      flowerAuth.createUser(user, function() {
        $scope.updateUsername();
        $location.path('/home');
      });
    };
  }]);
};
