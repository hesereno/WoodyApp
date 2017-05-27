'use strict'
var app = angular.module('woodyApp.editProfile', [

]);

app.controller('editProfileController', ['$scope', '$http', '$state', function($scope, $http, $state){

    $scope.editDog = false;

    $scope.buttonPaw = function(){
        $scope.editDog = false;
    };

    $scope.buttonUser = function(){
        $scope.editDog = true;
    }

    $scope.left = function () {
        $state.go("profile")
    };

    $scope.initView= function(){
        var username = localStorage.getItem('usr');
        var coma = username.indexOf(',');

        $scope.username = username.substring(0, coma);

        $http.get('https://www.institutmarianao.cat/woody/profileInfo.php?username='+ $scope.username).
        then(function(response) {
            console.log(response.data);
            for(var i = 0; i < response.data.length; i++){
                var string = response.data[i];
                response.data[i] = JSON.parse(string);
            }
            $scope.perros = response.data;
            console.log($scope.perros);
            console.log($scope.perros[0].dogName);
            console.log(response);
        });
    };

}]);