'use strict';
angular.module('cotabolo')
.factory('SaboresService', ['$firebaseArray', 'firebaseDataService', function($firebaseArray, firebaseDataService){
	var service = {};
	var sabores = $firebaseArray(firebaseDataService.sabores);

	service.listar = function(){
		return sabores;
	}

	service.incluir = function(sabor){
		sabores.$add(sabor);
	}

	return service;
}])