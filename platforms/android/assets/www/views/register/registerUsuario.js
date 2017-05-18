'use strict';
var app = angular.module('woodyApp.registerPersona', []);

app.controller('RegisterPersonaController',  ['$scope', '$rootScope', '$http', function($scope, $rootScope, $http){

    $scope.mascota = [];

    $scope.registre = function() {

        var nombre = document.getElementById("username").value;
        var pass = document.getElementById("password").value;
        var repass = document.getElementById("rePassword").value;
        var num = document.getElementById("nPerros").value;

        var user = {"username": nombre, "pass": pass, "nDogs": num};
        $rootScope.numero = user.nDogs;
        var test = JSON.stringify(user);
        localStorage.setItem("user",test);
        console.log(test);

        //var data = {username: nombre, password: contraseña};
        /*var data = "username=ramon&password=1234";
        $http.post('http://woodyapp.hol.es/registre.php', data)
            .then(
                function (response) {
                    console.log("entra");
                    console.log(response.data);
                    console.log(response)
                },
                function (response) {
                    console.log('error')
                })*/
        /*$http.get('http://woodyapp.hol.es/registre.php?username='+ nombre +'&pass='+ pass).
        then(function(response) {
            var result = response.data;
            console.log(result);
        });*/
    };

}]);
