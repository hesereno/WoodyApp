'use strict';
var app = angular.module('woodyApp.login', []);

app.controller('LoginController', ['$scope', '$http', '$state', function($scope, $http, $state){

    $scope.title = "Woody";

    $scope.initView = function(){

    };

    $scope.checkLogin = function(){
        console.log("entra");
        var username = document.getElementById("username").value;
        var password = document.getElementById("password").value;
        console.log(username + " " + password);
        $http.get('http://woodyapp.hol.es/login.php?username='+ username +'&pass='+ password).
        then(function(response) {
            var result = response.data;
            console.log(result);
            if(result === "succeed"){
                    localStorage.setItem("usr", username + ",true");
                    $state.go("profile");
            }else{
                alert("Authentication failed");
            }
        });
    }
}]);
