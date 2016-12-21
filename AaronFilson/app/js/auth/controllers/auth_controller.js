module.exports = function(app) {
  app.controller('authController', ['$scope', '$location', 'mixAuth', function($scope, $location, mixAuth) {
    $scope.username = null;

    $scope.updateUsername = function() {
      if ($location.path() == '/signin' || $location.path() == '/signup') return null;
      mixAuth.getUsername(function(res) {
        $scope.username = res.data.user;
      });
    };

    $scope.logout = function() {
      mixAuth.signOut(function() {
        $scope.username = null;
        $location.path('/signin')
      });
    };
  }]);
};
