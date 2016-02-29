require('angular');
var angular = window.angular;

var teamApp = angular.module('TeamApp', []);
require('./models/resources')(teamApp);
