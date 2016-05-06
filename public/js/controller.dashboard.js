'use strict';
angular.module('cotabolo')
.controller('DashboardController', ['ParticipantesService', 'EscolhasService', 
	function(ParticipantesService, EscolhasService){

	var self = this;
	var participantes;
	var escolhas;

	function init(){
		self.participantes = ParticipantesService.listar();
		self.escolhas = EscolhasService.listar();
	}

	init();
}]);