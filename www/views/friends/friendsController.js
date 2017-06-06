var app = angular.module('woodyApp.friends', []);

app.controller('friendsController',  ['$scope', '$state','$http', function($scope, $state,$http){

    $scope.buscando = false;
    $scope.isMyFriend = false;

    $scope.back = function () {
        $state.go('profile');
    };

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
                    if($scope.personas === "failed"){
                        $scope.personas = new Array(0);
                    }
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
                console.log(userId);
                data = {'userId':userId};
                $http.post("https://www.institutmarianao.cat/woody/getUserToken.php",data).then(
                    function(response){
                        console.log(response.data);
                        var userToken = response.data.token;
                        var notificationObj = {
                            contents: {en: "Tienes una solicitud de amistad de " + userData},
                            include_player_ids: [userToken],
                            data: {"notificationState": "solicitudAmistad"}
                        };
                        window.plugins.OneSignal.postNotification(notificationObj,
                            function(successResponse) {
                                console.log("Notification Post Success:", successResponse);
                            },
                            function (failedResponse) {
                                console.log("Notification Post Failed: ", failedResponse);
                            }
                        );
                    }),
                    function(response){
                        console.log(response);
                    };
            },function(response){
                console.log(response.data);
            });
    };

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
    };

    $scope.setUserVidited = function(userVidited){
        localStorage.setItem("userVisited", userVidited)
    };

    $scope.isFriend = function(friendName){
        for(var i = 0; i < $scope.friends.length; i++){
            console.log(friendName);
            console.log($scope.friends[i].user2);
            console.log($scope.isMyFriend);
            if(friendName == $scope.friends[i].user2) {
                return true;
            }
        }
        return false;
    };

    $scope.unfollow = function(userVisited){
        var userData = localStorage.getItem("usr");
        userData = userData.substring(0, userData.indexOf(','));
        var data = {"userId": userData,"userId2":userVisited};
        $http.post("https://www.institutmarianao.cat/woody/deleteFriendsRelationshipById.php", data).then(
            function(response){
                $scope.initView();
            },function(response){
                console.log(response._error);
            }
        );
    };

}]);