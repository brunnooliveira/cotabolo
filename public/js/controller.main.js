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
		auth.$unauth();
		$location.path('/dashboard');
	};

	auth.$onAuth(function(authData) {
      	self.user = authData;
    });
}]);