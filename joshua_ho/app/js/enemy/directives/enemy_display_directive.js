module.exports = function(app) {
  app.directive('enemyDisplay' , function(){
    return {
      restrict: 'E',
      replace: true,
      transclude: true,
      templateUrl: '/templates/enemy/directives/enemy.html',
      scope: true
    };
  });
};
