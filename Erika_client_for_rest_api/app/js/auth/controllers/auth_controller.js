module.exports = function(app) {
  app.controller('authController', ['$scope', 'humanAuth', function($scope, humanAuth) {
    $scope.username = null;

    $scope.updateUsername = function() {
      humanAuth.getUsername(function(res) {
        console.log(res);
        $scope.username = res.data.username;
      });
    };

    $scope.logout = function() {
      humanAuth.signOut(function() {
        $scope.username = null;
      });
    };
  }]);
};
