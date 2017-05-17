'use strict'
var app = angular.module('woodyApp.profile', [

]);

app.controller('profileController', ['$scope', '$http', function($scope, $http){

    $scope.initView= function(){
        var username = localStorage.getItem('usr');
        var coma = username.indexOf(',');

        $scope.username = username.substring(0, coma);

        $http.get('http://woodyapp.hol.es/profile.php?username='+ $scope.username).
        then(function(response) {
            console.log(response.username);
            console.log(response);
        });
    }

}]);