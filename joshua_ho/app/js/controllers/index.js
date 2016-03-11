//Main Controller, for Main Scope
module.exports = function(app){
  app.controller('MainController' , ['$scope' , function($scope){
    $scope.data = {
      friends: [],
      enemies: []
    };
    console.log('Main Ctrl Loaded');
  }])
}
