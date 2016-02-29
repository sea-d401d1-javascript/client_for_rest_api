const angular = require('angular');
const beersApp = angular.module('beersApp', []);

require('./services')(beersApp);

require('./beers')(beersApp);

require('./directives/dummy_directive')(beersApp); 

