'use strict';
angular.module('cotabolo', ['ngRoute']);

angular.module('cotabolo')
.config(['$routeProvider',function($routeProvider) {
	$routeProvider.when('/dashboard', {
        templateUrl: 'partials/dashboard.html',
        controller: 'DashboardController',
        controllerAs: 'dbCtrl'
    });

	$routeProvider.when('/cadastros', {
        templateUrl: 'partials/cadastros.html',
        controller: 'DashboardController',
        controllerAs: 'dbCtrl'
    });


    $routeProvider.otherwise({ redirectTo: '/dashboard' });
}])