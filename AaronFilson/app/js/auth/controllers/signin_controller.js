module.exports = function(app) {
  app.controller('SigninController', ['$scope', 'mixAuth', '$location', function($scope, auth, $location) {
    $scope.submit = function(user) {
      auth.signIn(user, function(err) {
        if(err) return null;
        $scope.updateUsername();
        $location.path('/');
      });
    };
  }]);
};
