const angular = require('angular');
const wapApp = angular.module('wapApp', []);

require('./services/resource_service')(wapApp);

require('./dogs/controllers/dogs_controller')(wapApp);

require('.humans/controllers/humans_controller')(wapApp);
