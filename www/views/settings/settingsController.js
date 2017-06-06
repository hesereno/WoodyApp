'use strict';
var app = angular.module('woodyApp.settings', []);

app.controller('settingsController',  ['$scope', '$state', function($scope, $state){

    $scope.goEditProfile = function () {
        $state.go("editProfile");
    }

    $scope.back = function () {
        $state.go("profile");
        ngDialog.close();
    };
    
}]);