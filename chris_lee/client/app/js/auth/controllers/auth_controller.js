module.exports = function(app) {
  app.controller('AuthController', ['$scope', 'csAuth', function($scope, csAuth) {
    $scope.username = null;

    $scope.updateUsername = function() {
      csAuth.getUsername(function(res) {
        console.log(res);
        $scope.username = res.data.username;
      });
    };

    $scope.logout = function() {
      csAuth.signOut(function() {
        $scope.username = null;
      });
    };
  }])
}
