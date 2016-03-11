module.exports = function(app) {
  app.directive('friendDisplay' , function(){
    return {
      restrict: 'E',
      replace: true,
      transclude: true,
      templateUrl: '/templates/friend/directives/friends.html',
      scope: true
    };
  });
};
