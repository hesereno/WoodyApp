var app = angular.module('woodyApp.otherProfile', []);

app.controller('otherProfileController',  ['$scope', '$state', function($scope, $state){

        $scope.back = function () {
            window.history.back();
        }

}]);