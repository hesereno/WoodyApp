'use strict'
var app = angular.module('woodyApp', [
    'ui.router',
    'woodyApp.login',
    'woodyApp.registerUser',
    'woodyApp.registerAnimal',
    'woodyApp.profile'
]);

app.directive('formAnimalesRegistro', function() {
    return {
        restrict: 'E',
        templateUrl: './directives/formAnimalesRegistro.html'
    };
});

app.directive('profileDatosMascota', function(){
    return{
        restrict: 'E',
        templateUrl: './directives/profileDatosMascota.html'
    };
});

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
        .state('registerAnimal', {
            url: "/registerAnimal",
            templateUrl: "./views/register/registerAnimal.html"
        })
        .state('profile', {
            url: "/profile",
            templateUrl: "./views/profile/profile.html"
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
        if(localStorage.getItem('usr') != null){
            $state.go('profile');
        }else{
            $state.go('login');
        }
    }

}]);
