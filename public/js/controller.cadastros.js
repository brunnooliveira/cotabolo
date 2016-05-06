'use strict';
angular.module('cotabolo')
.controller('CadastrosController', ['ParticipantesService', 'SaboresService', 'EscolhasService', '$confirm', '$uibModal',
	function(ParticipantesService, SaboresService, EscolhasService, $confirm, $uibModal){
	
	var self = this;
	var participantes,
		participante,
		exibirNovoParticipante = false;

	var sabores,
		sabor,
		exibirNovoSabor = false;

	self.prepararNovoParticipante = function(){
		self.exibirNovoParticipante = true;
		self.participante = {};
	}

	self.cancelarNovoParticipante = function(){
		self.exibirNovoParticipante = false;	
		self.participante = {};
	}

	self.salvarNovoParticipante = function(isValidForm, participante){
		if(!isValidForm)
			return;
		
		ParticipantesService.incluir(participante);
		self.exibirNovoParticipante = false;	
		self.participante = {};
	}

	self.prepararPagamentoParticipante = function(participante){
		var modalInstance = $uibModal.open({
			animation: true,
			templateUrl: 'partials/cadastros.pagamento.modal.html',
			controller: 'CadastrosPagamentoController',
			controllerAs: 'cadPagCtrl'
		});

		modalInstance.result.then(function (escolha) {
			if(escolha){
				console.log(escolha);
				self.confirmarEscolha(participante, escolha);
			}
		}, function () {
			console.log('Modal dismissed at: ' + new Date());
		});
	};

	self.confirmarEscolha = function(participante, escolha){
		escolha.participante = participante;
		EscolhasService.incluir(escolha);
		ParticipantesService.moverUltimo(participante);
	}

	self.inativarParticipante = function(participante){
		$confirm({
			title: 'Confirmação',
			text: 'Deseja excluir o participante?',
			ok: 'Sim',
			cancel: 'Não'
		})
		.then(function() {
			console.log('excluir participante' + participante.nome);
			ParticipantesService.excluir(participante);
		}, function(){
			console.log('não excluir participante' + participante.nome);
		});
	}

	self.prepararNovoSabor = function(){
		self.exibirNovoSabor = true;
		self.sabor = {};
	}

	self.cancelarNovoSabor = function(){
		self.exibirNovoSabor = false;	
		self.sabor = {};
	}

	self.salvarNovoSabor = function(isValidForm, sabor){
		if(!isValidForm)
			return;

		SaboresService.incluir(sabor);
		self.exibirNovoSabor = false;	
		self.sabor = {};
	}

	function init(){
		self.participantes = ParticipantesService.listar();
		self.sabores = SaboresService.listar();
	}

	init();
}])

.controller('CadastrosPagamentoController', function(){

})