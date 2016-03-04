module.exports = function(app) {
  app.controller('authController', ['$scope', 'jediAuth', function($scope, jedisAuth) {
    $scope.username = null;

    $scope.updateUsername = function() {
      jediAuth.getUsername(function(res) {
        $scope.username = res.data.username;
      });
    };

    $scope.logout = function() {
      jediAuth.signOut(function() {
        $scope.username = null;
      });
    };
  }]);
};
