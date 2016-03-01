const angular = require('angular');
const politiciansApp = angular.module('politiciansApp', []);

require('./services/index')(politiciansApp);
require('./politicians/index')(politiciansApp);
