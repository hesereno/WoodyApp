'use strict';
var app = angular.module('woodyApp.settings', []);

app.controller('settingsController',  ['$scope', '$state', function($scope, $state){
    
    $scope.logOut = function () {
        localStorage.removeItem("usr");
        $state.go("login");
    };

    $scope.back = function () {
        $state.go("profile")
    };

    document.addEventListener("backbutton", function(){
        $state.go('profile');
    }, false);
    
}]);