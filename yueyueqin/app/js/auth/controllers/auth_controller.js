module.exports = function(app) {
  app.controller('authController', ['$scope', 'userAuth', '$location',function($scope, userAuth, $location){
    $scope.name = null;
    $scope.updateUsername = function() {
      userAuth.getUsername(function(err,res){
        if(err) return console.log(err);
        console.log(res);
        $scope.name = res.data.username;
      });
    };
    $scope.logout = function() {
      userAuth.signout(function() {
        $scope.name = null;
        $location.path('/entry');
      });
    };
  }]);
};
