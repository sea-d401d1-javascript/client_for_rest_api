module.exports = function(app) {
  app.directive('redblue', function() {
    return{
      restrict: 'AEC', //restrict attribute, element, class
      replace: true,
      template: '<article style="float:left;background-color:{{color}}"><aside style="float:right;background-color:{{color}}">',
    }
  });
};
