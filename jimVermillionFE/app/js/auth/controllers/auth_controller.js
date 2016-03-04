module.exports = function(app) {
  app.controller('authController', ['$scope', 'flowerAuth', '$location', function($scope, flowerAuth, $location) {
    $scope.username = null;

    $scope.updateUsername = function() {
      console.log('updateUsername');
      flowerAuth.getUsername(function(res) {
        console.log('updateUsername callback');

        console.log(res);
        $scope.username = res.data.username;
      });
    };

    $scope.logout = function() {
      console.log('logout');

      flowerAuth.signOut(function() {
        console.log('logout callback in signOut');

        $scope.username = null;
        $location.path('/signin');
      });
    };
  }]);
};
