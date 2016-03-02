const angular = require('angular');
const studentsApp = angular.module('studentsApp', []);

require('./services')(studentsApp);
require('./students')(studentsApp);

