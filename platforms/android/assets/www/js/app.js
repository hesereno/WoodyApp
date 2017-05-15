'use strict'
var app = angular.module('woodyApp', [
    'ui.router',
    'woodyApp.login',
    'woodyApp.registerUser',
    'woodyApp.registerAnimal',
    'woodyApp.perfilUsuario'
]);

app.config(function($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise("login");
    $stateProvider
        .state('login', {
            url: "/login",
            templateUrl: "./views/login/login.html"
        })
        .state('registerUser', {
            url: "/registerUser",
            templateUrl: "./views/register/registerUser.html"
        })
        .state('registroAnimal', {
            url: "/registroAnimal",
            templateUrl: "./views/register/registerAnimal.html"
        })
        .state('perfilUsuario', {
            url: "/perfilUsuario",
            templateUrl: "./views/perfilUsuario/perfilUsuario.html"
        })
});

app.controller('AppController', ['$scope', '$http', function($scope, $http){

     $scope.test = function(){
         $http.get('http://woodyappdev.000webhostapp.com/test.php').
              then(function(response) {
                  var test = response.data;
                  console.log(test.password);
                  console.log(test.test);
                  console.log(test.username);
                  console.log(test.type)

              });
     }
}]);
