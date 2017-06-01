var app = angular.module('woodyApp.otherProfile', []);

app.controller('otherProfileController',  ['$scope', '$state', '$http', function($scope, $state, $http){

    $scope.userIsFriend = false;

    $scope.back = function () {
        $state.go('friends');
    };

    document.addEventListener("backbutton", function(){
        $state.go('friends');
    }, false);

    $scope.initView = function(){
        $scope.userVisited = localStorage.getItem('userVisited');
        $scope.actualUser = localStorage.getItem("usr");
        $scope.actualUser = $scope.actualUser.substring(0, $scope.actualUser.indexOf(','))
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
        $scope.isFriend();

    };

    $scope.follow = function(userId){
        var userData = localStorage.getItem("usr");
        userData = userData.substring(0, userData.indexOf(','));
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


    $scope.unFollow = function(){
        var data = {"userId": $scope.actualUser,"userId2":$scope.userVisited};
        console.log($scope.actualUser);
        console.log($scope.userVisited);
        $http.post("https://www.institutmarianao.cat/woody/deleteFriendsRelationshipById.php", data).then(
            function(response){
                console.log($scope.userIsFriend);
                $scope.initView();
            },function(response){
                console.log(response._error);
            }
        );
    };

    $scope.isFriend = function(){
        var data = {"userId": $scope.actualUser,"userId2":$scope.userVisited};
        console.log($scope.actualUser);
        console.log($scope.userVisited);
        $http.post("https://www.institutmarianao.cat/woody/getFriendsRelationshipById.php", data).then(
            function(response){
                if(response.data == -1){
                    $scope.userIsFriend = false;
                }else{
                    $scope.userIsFriend = true;
                }
                console.log($scope.userIsFriend);
            },function(response){
                console.log(response._error);
            }
        );
    }

}]);