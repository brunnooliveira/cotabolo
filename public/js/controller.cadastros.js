'use strict';
angular.module('cotabolo')
.controller('CadastrosController', ['ParticipantesService', 'SaboresService', '$confirm', '$uibModal',
	function(ParticipantesService, SaboresService, $confirm, $uibModal){
	
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
			controllerAs: 'cadPagCtrl',
			//size: size,
			resolve: {
				items: function () {
					return [];
				}
			}
		});

		modalInstance.result.then(function (participante) {
			console.log(participante);
		}, function () {
			console.log('Modal dismissed at: ' + new Date());
		});
	};

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


	self.confirmarPagamento = function(participante){
		if(participantes.length < 2)
			return;

		
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