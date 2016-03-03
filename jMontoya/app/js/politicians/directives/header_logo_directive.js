module.exports = function(app) {
  app.directive('logo', function() {
    return {
      restrict: 'E',
      template: '<h1 class="thin">A FUTURE TO <span>BELIEVE IN</span></h1><br><h2>TELL US WHO YOU ARE VOTING FOR IN 2016</h2><h3>VOTE<span>2016</span><span style="color:white;">&#9733;</span></h3>'
    };
  });
};
