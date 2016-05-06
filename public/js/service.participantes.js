'use strict';
angular.module('cotabolo')
.factory('ParticipantesService', ['$firebaseArray', 'firebaseDataService', 
	function($firebaseArray, firebaseDataService){

	var service = {};
	var participantes = $firebaseArray(firebaseDataService.participantes.orderByChild('posicao'));

	participantes.$loaded().then(function(){
		popularPrevisaoPagamento(participantes);
	})

	service.listar = function(){
		return participantes;
	}

	service.incluir = function(participante){
		var ultimoParticipante = getUltimoParticipante(participantes);	
		participante.posicao = (ultimoParticipante ? ultimoParticipante.posicao : 0) + 1;
		
		participante.previsaoPagamento = getProximaSexta(
			ultimoParticipante && ultimoParticipante.previsaoPagamento 
				? new Date(ultimoParticipante.previsaoPagamento) 
				: new Date())
			.toJSON();
		participantes.$add(participante);
	}

	service.excluir = function(participante){
		participantes.$remove(participante).then(function(){
				popularPosicao(participantes);
				popularPrevisaoPagamento(participantes);
			});
	}

	service.moverUltimo = function(participante){
		var ultimoParticipante = getUltimoParticipante(participantes);
		var participanteUpdate = participantes.$getRecord(participante.$id);
		if(ultimoParticipante && ultimoParticipante.posicao === participanteUpdate.posicao)
			return;

		participanteUpdate.posicao = (ultimoParticipante ? ultimoParticipante.posicao : 0) + 1;
		participantes.$save(participanteUpdate);

		participantes.push(participantes.shift());

		popularPosicao(participantes);
		popularPrevisaoPagamento(participantes);
	}

	function popularPosicao(participantes){
		angular.forEach(participantes, function(participante, key){
			var participanteUpdate = participantes.$getRecord(participante.$id);
			participanteUpdate.posicao = key + 1;
			participantes.$save(participanteUpdate);
		});
	}

	function getUltimoParticipante(participantes){
		if(participantes && participantes.length > 0){
			var newArray = participantes.slice();
			newArray.sort(function(a, b) {
			    return parseFloat(b.posicao) - parseFloat(a.posicao);
			});
			return newArray[0];
		}else{
			return null;
		}
	}

	function popularPrevisaoPagamento(participantes){
		var data = new Date();
		var participanteIndex = 0;
		for (var i = 0; i <= participantes.length * 7; i++) {
			if(data.getDay() === 5){
				//var participante = participantes.$getRecord(participantes[participanteIndex].$id);
				var participante = participantes.$getRecord(participantes[participanteIndex].$id);
				participante.previsaoPagamento = new Date(data).toJSON();
				participantes.$save(participante);
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