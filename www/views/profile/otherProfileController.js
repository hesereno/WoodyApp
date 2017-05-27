var app = angular.module('woodyApp.otherProfile', []);

app.controller('otherProfileController',  ['$scope', '$state', function($scope, $state){

    $scope.back = function () {
        $state.go('friends');
    };

    document.addEventListener("backbutton", function(){
        $state.go('friends');
    }, false);

}]);