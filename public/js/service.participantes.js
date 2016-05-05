'use strict';
angular.module('cotabolo')
.factory('ParticipantesService', ['$firebaseArray', 'firebaseDataService', function($firebaseArray, firebaseDataService){
	var service = {};
	var participantes = $firebaseArray(firebaseDataService.participantes.orderByChild('posicao'));

	service.listar = function(){
		return participantes;
	}

	service.incluir = function(participante){
		participante.posicao = getUltimaPosicao();
		participante.previsaoPagamento = (new Date()).toJSON();
		
		participantes.$add(participante);
	}

	service.excluir = function(participante){
		participantes.$remove(participante);
	}

	function getUltimaPosicao(){
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