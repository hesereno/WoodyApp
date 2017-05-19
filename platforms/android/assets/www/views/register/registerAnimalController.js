'use strict'
var app = angular.module('woodyApp.registerAnimal', []);

app.controller('registerAnimalController', ['$scope', '$http', '$rootScope', function($scope, $http, $rootScope){

    $scope.mascota = [];

    $scope.initView = function(){
        $scope.numero = new Array(parseInt($rootScope.numero));
        console.log($rootScope.numero);
    }

    $scope.registrarAnimales = function(){

        for(var i = 0; i < $rootScope.numero; i++){
            var mascotaName = document.getElementsByClassName("petname")[i].value;
            var fecha = document.getElementsByClassName("date")[i].value;
            $scope.mascota[i] = {"petname":mascotaName, "date":fecha};
            //consulta += "petname" + i + "="+ mascotaName +"&petdate"+i+"="+fecha+"&"
        }
        console.log("entra");
        console.log($scope.mascota);
        var test = localStorage.getItem('user');
        console.log(test);
        var userData = JSON.parse(test);
        var data = [];
        data[0] = $scope.mascota;
        data[1] = userData;
        console.log(JSON.stringify(data));

        $http.post('https://www.institutmarianao.cat/woody/loginMascota.php?', data).
        then(function(response) {
            console.log(response.data);
            console.log(response);
        });
    };
}]);