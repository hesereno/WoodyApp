'use strict'
var app = angular.module('woodyApp.profile', [

]);

app.controller('profileController', ['$scope', '$http', '$state', 'ngDialog', function($scope, $http, $state, ngDialog){


    $scope.initView= function(){
        var username = localStorage.getItem('usr');
        var coma = username.indexOf(',');

        $scope.cargada = false;
        $scope.username = username.substring(0, coma);

        $http.get('https://www.institutmarianao.cat/woody/profileInfo.php?username='+ $scope.username).
        then(function(response) {
            console.log(response.data);
            for(var i = 0; i < response.data.length; i++){
                var string = response.data[i];
                response.data[i] = JSON.parse(string);
            }
            $scope.perros = response.data;
        });

        var imgPerfil = document.getElementById('imagenPerfil');

        imgPerfil.onload = function () {
            $scope.cargada = true;
        };

        for($scope.perro in $scope.perros){
           var perro = document.getElementById('imgProf' + $scope.perros.indexOf($scope.perro));
           perro.onload = function () {

           }

        }

        $scope.checkNotifications();

    };

    $scope.checkNotifications = function(){
        var userData = localStorage.getItem("usr");
        userData = userData.substring(0, userData.indexOf(','));
        console.log(userData);
        var data = {"userId":userData};
        $http.post("https://www.institutmarianao.cat/woody/getNotifications.php",data).then(
            function(response){
                console.log(response.data);
                if(response.data == 0){
                    $scope.notifications = false;
                }else{
                    $scope.numNotif = response.data;
                    $scope.notifications = true;
                }
            },function(response){
                console.log(response.data);
            });
    };

    $scope.left = function () {
        $state.go("friends")
    };

    $scope.avisarAmigos = function(dogName){
        var data = {'userId': $scope.username};
        $http.post("https://www.institutmarianao.cat/woody/getFriends.php",data).then(
            function(response){
                console.log(response.data);
                var friends = response.data;
                for(var i = 0; i < friends.length; i++){
                    console.log(friends[i].user2);
                    var data = {'userId' : friends[i].user2};
                    $http.post("https://www.institutmarianao.cat/woody/getUserToken.php",data).then(
                        function(response){
                            console.log(response.data);
                            var userToken = response.data.token;
                            var notificationObj = {
                                contents: {en: $scope.username +": Socorro se ha perdido "+ dogName},
                                include_player_ids: [userToken],
                                data: {"notificationState": "solicitudAmistad"}
                            };
                            window.plugins.OneSignal.postNotification(notificationObj,
                                function(successResponse) {
                                    console.log("Notification Post Success:", successResponse);
                                    alert("Tus amigos han sido avisados");
                                },
                                function (failedResponse) {
                                    console.log("Notification Post Failed: ", failedResponse);
                                    alert("Vaya! ningun amigo tuyo esta conectado");
                                }
                            );
                        },function(response){
                            console.log(response.data);
                        });
                }
            },function(response){
                console.log(response.data);
            });
    };

    $scope.logOut = function () {
        $scope.userData = localStorage.getItem("usr").substring(0, localStorage.getItem("usr").indexOf(','));
        $http.post("http://www.institutmarianao.cat/woody/deleteDeviceId.php",{'userId':$scope.userData}).then(
            function(response){
                console.log("succed");
                var btnedit = document.getElementById('btnedit');
                btnedit.disabled = true;
                var btnlogout = document.getElementById('btnlogout');
                btnlogout.disabled = true;
                localStorage.removeItem("usr");
                $state.go("login");
                ngDialog.close();
            },function(response){
                console.log("error");
                alert("Error inesperado");
            }
        );
    };

    $scope.goEditProfile = function () {
        $state.go("editProfile");
        ngDialog.close();
    };

    $scope.openSettings = function(){
        ngDialog.open({
            template: './views/settings/settings.html',
            id: 'settingsDialog',
            showClose: false,
            width: '80%',
            height: '80%'
        });
    };

}]);