'use strict';
var app = angular.module('woodyApp.settings', []);

app.controller('settingsController',  ['$scope', '$state', '$http', 'ngDialog', function($scope, $state, $http, ngDialog){

    $scope.logOut = function () {
        $scope.userData = localStorage.getItem("usr").substring(0, localStorage.getItem("usr").indexOf(','));
        $http.post("http://www.institutmarianao.cat/woody/deleteDeviceId.php",{'userId':$scope.userData}).then(
            function(response){
                console.log("succed");
                localStorage.removeItem("usr");
                ngDialog.close();
                $state.go("login");
            },function(response){
                console.log("error");
                alert("Error inesperado");
            }
        );
    };

    $scope.back = function () {
        ngDialog.close();
        $state.go("profile")
    };

    $scope.closeDialog = function(){
        ngDialog.close();
    }
}]);