'use strict';
angular.module('cotabolo')
.factory('DashboardService', ['$firebaseArray', 'firebaseDataService', function($firebaseArray, firebaseDataService){
	var service = {};

	service.getParticipantes = function(){
		return $firebaseArray(firebaseDataService.participantes);
	}

	service.incluirParticipante = function(participante){
		participante.posicao = getUltimaPosicao();
		participante.previsaoPagamento = new Date();
		
		service.getParticipantes().$add(participante);
	}

	function getUltimaPosicao(){
		var participantes = service.getParticipantes();
		if(participantes && participantes.length > 0){
			participantes.sort(function(a, b) {
			    return parseFloat(b.posicao) - parseFloat(a.posicao);
			});
			return participantes[0].posicao + 1;
		}else{
			return 1;
		}
	}

	return service;
}])