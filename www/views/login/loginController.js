'use strict';
var app = angular.module('woodyApp.login', []);


app.controller('LoginController', ['$scope', '$http', '$state', function($scope, $http, $state){

    $scope.title = "Woody";

    $scope.initView = function(){
        document.addEventListener("backbutton", function(){
            navigator.app.exitApp();
        }, false);
        $scope.loading = false;
    };

    $scope.checkLogin = function(){
        console.log("entra");
        var username = document.getElementById("username").value;
        var password = document.getElementById("password").value;
        console.log(username + " " + password);
        $scope.loading = true;
        $http.get('https://www.institutmarianao.cat/woody/login.php?username='+ username +'&pass='+ password).
        then(function(response) {
            var result = response.data;
            console.log(result);
            if(result === "succeed"){
                $scope.loading = false;
                localStorage.setItem("usr", username + ",true");
                $state.go("profile");
            }else{
                $scope.loading = false;
                alert("Authentication failed");
            }
        });
    }
}]);