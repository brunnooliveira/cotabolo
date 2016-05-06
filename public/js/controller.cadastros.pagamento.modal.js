'use strict';
angular.module('cotabolo')
.controller('CadastrosPagamentoController', ['$uibModalInstance', 'SaboresService', 
	function ($uibModalInstance, SaboresService) {

  var self = this;
  var produtos;
  
  self.sabores;

  self.ok = function (escolha) {
  	$uibModalInstance.close(escolha);
  };

  self.cancel = function () {
  	$uibModalInstance.dismiss('cancel');
  };

  function init(){
  	self.sabores = SaboresService.listar();
  };

  init();
}]);