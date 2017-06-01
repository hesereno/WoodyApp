'use strict';
var app = angular.module('woodyApp.login', []);


app.controller('LoginController', ['$scope', '$http', '$state', 'md5', function($scope, $http, $state, md5){

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
        var token = JSON.parse(localStorage.getItem("deviceId")).userId;
        //password = md5.createHash(password);
        $scope.loading = true;
        $http.get('https://www.institutmarianao.cat/woody/login.php?username='+ username +'&pass='+ password).
        then(function(response) {
            var result = response.data;
            console.log(result);
            if(result === "succeed"){
                    localStorage.setItem("usr", username + ",true");
                    $scope.userData = localStorage.getItem("usr").substring(0, localStorage.getItem("usr").indexOf(','));
                    $http.post("http://www.institutmarianao.cat/woody/addDeviceId.php",{'userId':$scope.userData,'token':token}).then(
                        function(response){
                            console.log("succed");
                            $scope.loading = false;
                            $state.go("profile");
                        },function(response){
                            console.log("error");
                            alert("Error inesperado");
                        }
                    );
            }else{
                $scope.loading = false;
                alert("Authentication failed");
            }
        });
    }
}]);