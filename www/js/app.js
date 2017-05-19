'use strict'
var app = angular.module('woodyApp', [
    'ui.router',
    'woodyApp.login',
    'woodyApp.registerUser',
    'woodyApp.registerAnimal',
    'woodyApp.profile',
    'woodyApp.settings',
    'woodyApp.friends'
]);

app
    .directive('formAnimalesRegistro', function() {
        return {
            restrict: 'E',
            templateUrl: './directives/formAnimalesRegistro.html'
        };
    })

    .directive('profileDatosMascota', function(){
        return{
            restrict: 'E',
            templateUrl: './directives/profileDatosMascota.html'
        };
    })

    .directive('otherProfileDatosMascota', function(){
        return{
            restrict: 'E',
            templateUrl: './directives/otherProfileDatosMascota.html'
        };
    })

    .directive('friendsList', function(){
        return{
            restrict: 'E',
            templateUrl: './directives/friendsList.html'
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
        .state('otherProfile', {
            url: "/otherProfile",
            templateUrl: "./views/profile/otherProfile.html"
        })
        .state('settings', {
            url: "/settings",
            templateUrl: "./views/settings/settings.html"
        })
        .state('map', {
            url: "/map",
            templateUrl: "./views/map/map.html"
        })
        .state('friends', {
            url: "/friends",
            templateUrl: "./views/friends/friends.html"
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
