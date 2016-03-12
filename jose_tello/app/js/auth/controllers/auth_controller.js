module.exports = function(app) {
  app.controller('authController', ['$scope', 'petsAuth', function($scope, petsAuth) {
    $scope.username = null;

    $scope.updateUsername = function() {
      petsAuth.getUsername(function(res) {
        console.log(res);
        $scope.username = res.data.username;
      });
    };

    $scope.logout = function() {
      petsAuth.signOut(function() {
        $scope.username = null;
      });
    };
  }]);
};
