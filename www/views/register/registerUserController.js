'use strict'
var app = angular.module('woodyApp.registerUser', []);

app.controller('registerUserController',  ['$scope', '$http', function($scope, $http){


    $scope.registre = function() {

        var nombre = document.getElementById("username").value;
        var pass = document.getElementById("password").value;
        var repass = document.getElementById("rePassword").value;

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
        $http.get('http://woodyapp.hol.es/registre.php?username='+ nombre +'&pass='+ pass).
        then(function(response) {
            var result = response.data;
            console.log(result);
        });
    }
}]);