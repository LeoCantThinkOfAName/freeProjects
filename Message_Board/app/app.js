'use strict';

// Declare app level module which depends on views, and components
angular.module('msgBoard', [
  'ngRoute',
  'firebase',
  'msgBoard.msgs'
  ])
.config(['$locationProvider', '$routeProvider', function($locationProvider, $routeProvider) {
  $locationProvider.hashPrefix('!');

  $routeProvider.otherwise({redirectTo: '/msg'});
}]);
