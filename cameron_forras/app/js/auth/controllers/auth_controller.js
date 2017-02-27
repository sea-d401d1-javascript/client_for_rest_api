module.exports = function(app) {
  app.controller('authController', ['$scope', 'studentAuth', function($scope, studentAuth) {
    $scope.username = null;

    $scope.updateUsername = function() {
      studentAuth.getUsername(function(res) {
        console.log(res);
        $scope.username = res.data.username;
      });
    };

    $scope.logout = function() {
      studentAuth.signOut(function() {
        $scope.username = null;
      });
    };
  }]);
};
