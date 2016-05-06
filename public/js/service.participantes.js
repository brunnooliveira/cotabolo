'use strict';
angular.module('cotabolo')
.factory('ParticipantesService', ['$firebaseArray', 'firebaseDataService', function($firebaseArray, firebaseDataService){
	var service = {};
	var participantes = $firebaseArray(firebaseDataService.participantes.orderByChild('posicao'));

	participantes.$loaded().then(function(){
		popularPrevisaoPagamento(participantes);
	})

	service.listar = function(){
		return participantes;
	}

	service.incluir = function(participante){
		participante.posicao = getUltimoParticipante(participantes).posicao + 1;
		var ultimoParticipante = getUltimoParticipante(participantes);
		ordenarParticipantesPosicaoCrescente(participantes);
		participante.previsaoPagamento = getProximaSexta(
			ultimoParticipante
				? new Date(ultimoParticipante.previsaoPagamento) 
				: new Date())
			.toJSON();
		participantes.$add(participante);
	}

	service.excluir = function(participante){
		participantes.$remove(participante);
		popularPrevisaoPagamento(participantes);
		popularPosicao(participantes);
	}

	function popularPosicao(participantes){
		angular.forEach(participantes, function(participante, key){
			participante.posicao = key + 1;
			participantes.$save();
		});
	}

	function ordenarParticipantesPosicaoCrescente(participantes){
		if(participantes && participantes.length > 0){
			participantes.sort(function(a, b) {
			    return parseFloat(a.posicao) - parseFloat(b.posicao);
			});
		}
	}

	function getUltimoParticipante(participantes){
		if(participantes && participantes.length > 0){
			participantes.sort(function(a, b) {
			    return parseFloat(b.posicao) - parseFloat(a.posicao);
			});
			return participantes[0];
		}else{
			return null;
		}
	}

	function popularPrevisaoPagamento(participantes){
		var data = new Date();
		var participanteIndex = 0;
		for (var i = 0; i <= participantes.length * 7; i++) {
			if(data.getDay() === 5){
				participantes[participanteIndex].previsaoPagamento = new Date(data);
				participanteIndex++;
				if (participanteIndex === participantes.length) {
					break;
				}
			}
			data.setDate(data.getDate() + 1);
		}
		return participantes;
	}

	function getProximaSexta(data){
		for (var i = 0; i <= 7; i++) {
			data.setDate(data.getDate() + 1);
			if(data.getDay() === 5){
				return data
			}
		};
	}

	return service;
}])