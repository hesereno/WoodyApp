'use strict';
var app = angular.module('woodyApp', [
    'ui.router',
    'ngCookies',
    'woodyApp.login',
    'woodyApp.registerAnimal',
    'woodyApp.profile',
    'woodyApp.registerPersona'
]);

app
    .directive('formAnimalesRegistro', function() {
        return {
            restrict: 'E',
            templateUrl: './directives/formAnimalesRegistro.html',
        }
    })
    .directive('profileDatosMascota', function() {
        return {
            restrict: 'E',
            templateUrl: './directives/profileDatosMascota/profileDatosMascota.html',
            scope:{
                test: '@'
            }
        }
    });

app.config(function($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise("splash");
    $stateProvider
        .state('login', {
            url: "/login",
            templateUrl: "./views/login/login.html"
        })
        .state('registroAnimal', {
            url: "/registroAnimal",
            templateUrl: "./views/register/registerAnimal.html"
        })
        .state('registroPersona', {
            url: "/registroPersona",
            templateUrl: "./views/register/registerPersona.html"
        })
        .state('profile', {
            url: "/profile",
            templateUrl: "./views/profile/profile.html"
        })
        .state('splash', {
            url: "/splash",
            templateUrl: "./views/splashScreen/splashScreen.html"
        })
});

app.controller('AppController', ['$scope', '$state', function($scope, $state){

     /*$scope.test = function(){
         $http.get('http://woodyappdev.000webhostapp.com/test.php').
              then(function(response) {
                  var test = response.data;
                  console.log(test.password);
                  console.log(test.test);
                  console.log(test.username);
                  console.log(test.type)

              });
     }*/

    $scope.initApp = function(){
        document.addEventListener('deviceready', function(){
             if(localStorage.getItem('usr') != null){
                $state.go('profile');
             }else{
                $state.go('login');
             }
             //$state.go('login');
        }, false);
        document.addEventListener("backbutton", function(){}, false);

    }

}]);
