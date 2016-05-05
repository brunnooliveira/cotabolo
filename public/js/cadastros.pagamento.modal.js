'use strict';
angular.module('cotabolo')
.controller('CadastrosPagamentoController', ['$uibModalInstance', function ($uibModalInstance) {

  var self = this;
  var produtos;

  self.ok = function () {
  	console.log('ok');
    $uibModalInstance.close();
  };

  self.cancel = function () {
  	console.log('cancel');
    $uibModalInstance.dismiss('cancel');
  };
}]);