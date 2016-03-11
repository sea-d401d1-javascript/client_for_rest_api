module.exports = function(app) {
  app.directive('enemyPostForm' , function(){
    return {
      restrict: 'E',
      replace: true,
      templateUrl: '/templates/enemy/directives/enemy_post_form.html',
      scope: true
    };
  });
};
