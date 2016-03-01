const angular = require('angular');
const beersApp = angular.module('beersApp', []);

require('./services/resource_service')(beersApp);
require('./controllers/beers_controller')(beersApp);
require('./directives/beer_display_directive')(beersApp);
require('./directives/beer_form_directive')(beersApp);


