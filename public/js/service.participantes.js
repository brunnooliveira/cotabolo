'use strict';
angular.module('cotabolo')
.factory('ParticipantesService', ['$firebaseArray', 'firebaseDataService', 
	function($firebaseArray, firebaseDataService){

	var service = {};
	var participantes = $firebaseArray(firebaseDataService.participantes.orderByChild('posicao'));

	participantes.$loaded().then(function(){
		popularPosicao(participantes);
		popularPrevisaoPagamento(participantes);
		//ativarTodos();
	})

	service.listar = function(){
		return participantes;
	}

	service.incluir = function(participante){
		var ultimoParticipante = getUltimoParticipante(participantes);   
    	participante.posicao = (ultimoParticipante ? ultimoParticipante.posicao : 0) + 1; 
     
		participante.ativo = true;
		participantes.$add(participante).then(function(){
			popularPosicao(participantes);
			popularPrevisaoPagamento(participantes);
		});
	}

	service.excluir = function(participante){
		var participanteUpdate = participantes.$getRecord(participante.$id);
		participanteUpdate.ativo = false;
		participanteUpdate.dataInativacao = new Date().toJSON();
		participantes.$save(participanteUpdate).then(function(){
			popularPosicao(participantes);
			popularPrevisaoPagamento(participantes);	
		});
	}

	service.reativar = function(participante){
		var participanteUpdate = participantes.$getRecord(participante.$id);
		var ultimoParticipante = getUltimoParticipante(participantes);   
    	participanteUpdate.posicao = (ultimoParticipante ? ultimoParticipante.posicao : 0) + 1; 
     
		participanteUpdate.ativo = true;
		participantes.$save(participanteUpdate).then(function(){
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
		participantes.$save(participanteUpdate).then(function(){
			participantes.push(participantes.shift());
			popularPosicao(participantes);
			popularPrevisaoPagamento(participantes);	
		});
	}

	function ativarTodos(){
		angular.forEach(participantes, function(participante, key){
			console.log(participante);
			var participanteUpdate = participantes.$getRecord(participante.$id);
			participanteUpdate.ativo = true;
			participantes.$save(participanteUpdate);
		});
	}

	function popularPosicao(participantes){
		var count = 0;
		angular.forEach(participantes, function(participante, key){
			var participanteUpdate = participantes.$getRecord(participante.$id);
			if(participante.ativo){
				participanteUpdate.posicao = count + 1;
				count++;
			}else{
				participanteUpdate.posicao = 0;
			}
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
		var participante;

		for (var i = 0; i < participantes.length; i++) {
			if(participantes[i].ativo){
				console.log(participantes[i]);
				data = getProximaSexta(data);
				var participanteUpdate = participantes.$getRecord(participantes[i].$id);
				participanteUpdate.previsaoPagamento = new Date(data).toJSON();
				participantes.$save(participanteUpdate);
			}

		};
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