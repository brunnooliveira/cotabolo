'use strict';
angular.module('cotabolo')
.controller('DashboardController', ['ParticipantesService', function(ParticipantesService){
	var self = this;
	var participantes;

	function init(){
		self.participantes = ParticipantesService.listar();
	}

	init();
}]);