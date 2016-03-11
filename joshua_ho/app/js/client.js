const angular = require('angular');
const router = require('angular-ui-router');
//Scope properties ONLY inherit down state chains if views are nested
var friendsApp = angular.module('friendsApp' , [] )

require('./controllers')(friendsApp);
require('./services')(friendsApp);

require('./friend')(friendsApp);
require('./enemy')(friendsApp);
