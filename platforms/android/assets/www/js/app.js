'use strict'
var app = angular.module('woodyApp', [
    'ui.router',
    'woodyApp.login'
]);

app.config(function($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise("login");
    $stateProvider
        .state('login', {
            url: "/login",
            templateUrl: "./views/login/login.html"
        })
});

app.controller('AppController', ['$scope', '$http', function($scope, $http){

     $scope.test = function(){
         $http.get('http://woodyappdev.000webhostapp.com/test.php').
              then(function(response) {
                  var test = response.data;
                  console.log(test.password)
                  console.log(test.test)
                  console.log(test.username)
                  console.log(test.type)

              });
     }
    $scope.test = function(){
        $http.get('http://woodyappdev.000webhostapp.com/test.php').
        then(function(response) {
            var test = response.data;
            console.log(test.password)
            console.log(test.test)
            console.log(test.username)
            console.log(test.type)

        });
    }
}]);
