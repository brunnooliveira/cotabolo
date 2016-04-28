'use strict';
angular.module('cotabolo')
.controller('DashboardController', ['DashboardService', function(DashboardService){
	var self = this;
	var participantes,
		participante,
		exibirNovoParticipante = false;

	self.prepararNovoParticipante = function(){
		self.exibirNovoParticipante = true;
		self.participante = {};
	}

	self.cancelarNovoParticipante = function(){
		self.exibirNovoParticipante = true;	
		self.participante = {};
	}

	self.salvarNovoParticipante = function(isValidForm, participante){
		if(!isValidForm)
			return;

		console.log(participante);
		DashboardService.incluirParticipante(participante);
		self.exibirNovoParticipante = false;	
		self.participante = {};
	}

	self.confirmarPagamento = function(participante){
		if(participantes.length < 2)
			return;

		
	}

	function init(){
		self.participantes = DashboardService.getParticipantes();
	}

	init();
}]);