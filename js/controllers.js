'use strict';
angular.module('cotabolo')
.controller('MainController', ['auth', '$firebaseObject', '$location', '$scope', 
	function(auth, $firebaseObject, $location, $scope){
	
	var self = this;

	self.user;
	self.error;

	self.login = function(user){
		auth.$authWithPassword({
        	"email": user.email,
        	"password": user.senha
      	})
      	.then(function(user) {
        	console.log(user);
        	$location.path('/cadastros');
      	}, function(error) {
	        if (error = 'INVALID_EMAIL') {
	        	self.error = 'Credenciais inválidas!';
	          	console.log('email invalid or not signed up — trying to sign you up!');
	        } else if (error = 'INVALID_PASSWORD') {
	        	self.error = 'Credenciais inválidas!';
	          	console.log('wrong password!');
	        } else {
	        	self.error = error;
	          	console.log(error);
	        }
	    });
    }

	self.logout = function(){
		console.log("Logout");
		auth.$unauth();
		$location.path('/dashboard');
	};

	auth.$onAuth(function(authData) {
      self.user = authData;
    });
}])

.controller('DashboardController', ['DashboardService', '$loading', function(DashboardService, $loading){
	var self = this;
	var participantes,
		participante,
		exibirNovoParticipante = false;

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

		console.log(participante);
		DashboardService.incluirParticipante(participante);
		self.exibirNovoParticipante = false;	
		self.participante = {};
	}

	self.confirmarPagamento = function(participante){
		if(participantes.length < 2)
			return;

		
	}

	function init(){
		$loading.start('geral');
		self.participantes = DashboardService.getParticipantes();
	}

	init();
}]);