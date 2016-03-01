const angular = require('angular');
const activityApp = angular.module('activityApp', []);

require('./services')(activityApp);

require('./activity')(activityApp);
