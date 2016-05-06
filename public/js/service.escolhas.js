'use strict';
angular.module('cotabolo')
.factory('EscolhasService', ['$firebaseArray', 'firebaseDataService', function($firebaseArray, firebaseDataService){
	var service = {};
	var escolhas = $firebaseArray(firebaseDataService.escolhas);

	service.listar = function(){
		return escolhas;
	}

	service.incluir = function(escolha){
		escolha.data = new Date().toJSON();
		escolhas.$add(escolha);
	}

	return service;
}])