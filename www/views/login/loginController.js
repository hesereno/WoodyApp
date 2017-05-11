'use strict';
var app = angular.module('woodyApp.login', []);

app.controller('LoginController', ['$scope', '$http', function($scope, $http){

    $scope.title = "Woody";

    $scope.checkLogin = function(){
        console.log("entra");
        var username = document.getElementById("username").value;
        var password = document.getElementById("password").value;
        console.log(username + " " + password);
        $http.get('http://woodyappdev.000webhostapp.com/test.php?username='+ username).
        then(function(response) {
            var result = response.data;
            console.log(result);
            console.log(result.password);
            console.log(result.username);

            if(result){
                console.log(password === result.password);
                if(password === result.password){
                    alert("Authentication succeed");
                }else{
                    alert("Authentication failed");
                }
            }else{
                alert("Authentication failed");
            }
        });
    }
}]);
