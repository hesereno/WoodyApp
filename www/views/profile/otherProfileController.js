var app = angular.module('woodyApp.otherProfile', []);

app.controller('otherProfileController',  ['$scope', '$state', '$http', function($scope, $state, $http){

    $scope.back = function () {
        $state.go('friends');
    };

    document.addEventListener("backbutton", function(){
        $state.go('friends');
    }, false);

    $scope.initView = function(){
        $scope.userVisited = localStorage.getItem('userVisited');

        $http.get('https://www.institutmarianao.cat/woody/profileInfo.php?username='+ $scope.userVisited).
        then(function(response) {
            console.log(response.data);
            for(var i = 0; i < response.data.length; i++){
                var string = response.data[i];
                response.data[i] = JSON.parse(string);
            }
            $scope.perros = response.data;
            console.log(response.data);
        });
    }

}]);