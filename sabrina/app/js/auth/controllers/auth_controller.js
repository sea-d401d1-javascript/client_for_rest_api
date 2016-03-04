module.exports = function(app) {
  app.controller('authController', ['$scope', 'requestAuth', function($scope, requestAuth) {
    $scope.username = null;

    $scope.updateUsername = function() {
      requestAuth.getUsername(function(res) {
        console.log(res);
        $scope.username = res.data.username;
      });
    };

    $scope.logout = function() {
      requestAuth.signOut(function() {
        $scope.username = null;
      });
    };
  }]);
};
