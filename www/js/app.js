'use strict'
var app = angular.module('woodyApp', [
    'ui.router',
    'ngTouch',
    'woodyApp.login',
    'woodyApp.registerUser',
    'woodyApp.profile',
    'woodyApp.settings',
    'woodyApp.friends',
    'woodyApp.otherProfile',
    'woodyApp.notifications',
    'woodyApp.editProfile'
]);

app
    .directive('formAnimalesRegistro', function() {
        return {
            restrict: 'E',
            templateUrl: './directives/formAnimalesRegistro.html'
        };
    })

    .directive('otherProfileDatosMascota', function(){
        return{
            restrict: 'E',
            templateUrl: './directives/otherProfileDatosMascota.html'
        };
    });


app.config(function($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise("login");
    $stateProvider
        .state('login', {
            url: "/login",
            templateUrl: "./views/login/login.html"
        })
        .state('registerUser', {
            url: "/registerUser",
            templateUrl: "./views/register/registerUser.html"
        })
        .state('registerAnimal', {
            url: "/registerAnimal",
            templateUrl: "./views/register/registerAnimal.html"
        })
        .state('profile', {
            url: "/profile",
            templateUrl: "./views/profile/profile.html"
        })
        .state('otherProfile', {
            url: "/otherProfile",
            templateUrl: "./views/profile/otherProfile.html"
        })
        .state('settings', {
            url: "/settings",
            templateUrl: "./views/settings/settings.html"
        })
        .state('map', {
            url: "/map",
            templateUrl: "./views/map/map.html"
        })
        .state('friends', {
            url: "/friends",
            templateUrl: "./views/friends/friends.html"
        })
        .state('notifications', {
            url: "/notifications",
            templateUrl: "./views/notifications/notifications.html"
        })
        .state('editProfile', {
            url: "/editProfile",
            templateUrl: "./views/profile/editProfile.html"
        })
});

app.controller('AppController', ['$scope','$http', '$state', function($scope, $http, $state){

    /*$scope.test = function(){
     $http.get('http://woodyappdev.000webhostapp.com/test.php').
     then(function(response) {
     var test = response.data;
     console.log(test.password);
     console.log(test.test);
     console.log(test.username);
     console.log(test.type)
     });
     }*/

    //$state.go('login');
    $scope.initApp = function(){
        document.addEventListener('deviceready', function(){
            if(localStorage.getItem('usr') != null){
                $state.go('profile');
            }else{
                $state.go('login');
            }
            navigator.splashscreen.hide();

        }, false);

    }

    /*$scope.test = function(){
        var data = {
            "notification":{
                "title":"Notification title",
                "body":"Notification body",
                "sound":"default",
                "click_action":"FCM_PLUGIN_ACTIVITY",
                "icon":"fcm_push_icon"
            },
            "data":{
                "param1":"value1",
                "param2":"value2"
            },
            "to":"fBCNT1xXis4:APA91bFj-Y1FcBLqHGyIEL9TMicEQR2WlcGx5J2W6O8jeMq7eCtyAuX91NoeejrEO408OZBsWAcUHSPSNbV6fTbK15mkd-o_-m2RpnhfgCGbIXRnv4sX7eA55TZSLcsmyK7G3X7YbsBt",
            "priority":"high",
            "restricted_package_name":""
        };

        $http.post("https://fcm.googleapis.com/fcm/send", data,
        {
            "Content-Type" : "application/json",
            "Authorization" : "key=AIzaSyDfDHPU2lekHU2OPQBaAyPAGImGPJJ_Hmk"
        })
        .then(
            function (response) {
                console.log(response)
            },
            function (response) {
                console.log(response)
            }
        );
    }*/

}]);
