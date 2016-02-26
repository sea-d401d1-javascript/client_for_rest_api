const angular = require('angular');
const wapApp = angular.module('wapApp', []);

require('./services/resource_service')(wapApp);

require('./dogs/controllers/dog_controller')(wapApp);
