var app = angular.module('woodyApp.friends', []);

app.controller('friendsController',  ['$scope', '$state','$http', function($scope, $state,$http){

    $scope.buscando = false;

    $scope.back = function () {
        $state.go('profile');
    };

    document.addEventListener("backbutton", function(){
        $state.go('profile');
    }, false);

    $scope.getUsersByName = function(){
        var personToSearch = document.getElementById("search").value;
        if(personToSearch.length > 0){
            $scope.buscando = true;
            console.log($scope.buscando);
            var data = {"person": personToSearch};
            $http.post("https://www.institutmarianao.cat/woody/getUsers.php",data).then(
                function(response){
                    console.log(response.data);
                    $scope.personas = response.data;
                },
                function(response){
                    console.log(response);
                });
        }else{
            $scope.buscando = false;
            console.log($scope.buscando);

        }
    };

    $scope.gestionarAmistad = function(userId){
        var userData = localStorage.getItem("usr");
        userData = userData.substring(0, userData.indexOf(','));
        console.log(userData);
        console.log(userId);
        var data = {"userId":userData, "friend":userId};
        $http.post("https://www.institutmarianao.cat/woody/getRelationship.php",data).then(
            function(response){
                console.log(response.data);
            },function(response){
                console.log(response.data);
            });
    }

    $scope.showFriendsList = function(){
        var userData = localStorage.getItem("usr");
        userData = userData.substring(0, userData.indexOf(','));
        console.log(userData);
        var data = {"userId":userData};
        $http.post("https://www.institutmarianao.cat/woody/getFriends.php",data).then(
            function(response){
                console.log(response.data);
                $scope.friends = response.data;
            },function(response){
                console.log(response.data);
            });
    }

}]);