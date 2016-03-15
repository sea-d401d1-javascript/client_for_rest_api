require('angular');
var angular = window.angular;

var teamApp = angular.module('TeamApp', []);
require('./services')(teamApp);//looks for the default index.js file
require('./controllers')(teamApp);//looks for the default index.js file
require('./directives')(teamApp);//looks for the default index.js file
