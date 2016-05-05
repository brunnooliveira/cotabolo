'use strict';
angular.module('cotabolo', ['ngRoute', 'firebase', 'ui.bootstrap', 'angular-confirm']);

angular.module('cotabolo')
.run(function($rootScope, $location) {
  $rootScope.$on("$routeChangeError", function(e, next, prev, err) {
    if(err === "AUTH_REQUIRED") {
      $location.path("/login");
    }
  })
})

angular.module('cotabolo')
.config(['$routeProvider',function($routeProvider) {
	$routeProvider.when('/dashboard', {
        templateUrl: 'partials/dashboard.html',
        controller: 'DashboardController',
        controllerAs: 'dbCtrl'
    });

	$routeProvider.when('/cadastros', {
        templateUrl: 'partials/cadastros.html',
        controller: 'CadastrosController',
        controllerAs: 'cadCtrl',
        resolve: {
                currentAuth: function(auth) {
                  return auth.$requireAuth();
            }
        }
    });

    $routeProvider.when('/login', {
        templateUrl: 'partials/login.html',
        controller: 'MainController',
        controllerAs: 'mainCtrl'
    });

    $routeProvider.otherwise({ redirectTo: '/dashboard' });
}])