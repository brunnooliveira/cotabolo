'use strict';
//CONTANTS
angular.module('cotabolo')
    .constant('FirebaseUrl', 'http://cotaboloweb.firebaseio.com');

//AUTH SERVICE
angular.module('cotabolo')
    .factory('auth', function($firebaseAuth, firebaseDataService) {
  return $firebaseAuth(firebaseDataService.root);
})

//FIREBASE SERVICE
angular.module('cotabolo')
    .factory('firebaseDataService', firebaseDataService);

firebaseDataService.$inject = ['FirebaseUrl'];

function firebaseDataService(FirebaseUrl) {
    var root = new Firebase(FirebaseUrl);

    var service = {
        root: root,
        participantes: root.child('participantes'),
        sabores: root.child('sabores')
    };

    return service;
}
