'use strict';
angular.module('cotabolo')
.factory('DashboardService', function(){
	var service = {};

	var participantes = [
		{
			nome: "Brunno",
			posicao: 2,
			previsaoPagamento: new Date()
		},{
			nome: "Fulano",
			posicao: 1,
			previsaoPagamento: new Date()
		}
	];

	service.getParticipantes = function(){
		return participantes;
	}

	service.incluirParticipante = function(participante){
		participante.posicao = getUltimaPosicao();
		participante.previsaoPagamento = new Date();
		participantes.push(participante);
	}

	function getUltimaPosicao(){
		if(participantes){
			participantes.sort(function(a, b) {
			    return parseFloat(b.posicao) - parseFloat(a.posicao);
			});
			return participantes[0].posicao + 1;
		}else{
			return 1;
		}
	}

	return service;
})