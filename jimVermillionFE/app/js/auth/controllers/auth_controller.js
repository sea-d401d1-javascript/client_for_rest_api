module.exports = function(app) {
  app.controller('authController', ['$scope', 'flowerAuth', function($scope, flowerAuth) {
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
      });
    };
  }]);
};
