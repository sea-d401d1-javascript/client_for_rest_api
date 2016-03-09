module.exports = function(app) {
  app.controller('SigninController', ['$scope', 'flowerAuth', '$location', function($scope, flowerAuth, $location) {
    $scope.submit = function(user) {
      flowerAuth.signIn(user, function() {
        $scope.updateUsername();
        $location.path('/home');
      }); 
    };
  }]);
};
