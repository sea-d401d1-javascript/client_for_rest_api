module.exports = function(app) {
  app.controller('authController', ['$scope', 'mixAuth', function($scope, mixAuth) {
    $scope.username = null;

    $scope.updateUsername = function() {
      mixAuth.getUsername(function(res) {
        console.log(res);
        $scope.username = res.data.username;
      });
    };

    $scope.logout = function() {
      mixAuth.signOut(function() {
        $scope.username = null;
      });
    };
  }]);
};
