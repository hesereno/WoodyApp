'use strict';
var app = angular.module('woodyApp', [
    'ui.router',
    'ngTouch',
    'ngDialog',
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

            document.addEventListener("backbutton", function(e){
                e.preventDefault();
                if(window.location.hash=="#!/profile" || window.location.hash=="#!/login"){
                    navigator.app.exitApp();
                }else if (window.location.hash=="#!/otherProfile"){
                    $state.go('friends');
                }else if (window.location.hash=="#!/settings" || window.location.hash=="#!/friends" || window.location.hash=="#!/notifications"){
                    $state.go('profile');
                }else if (window.location.hash=="#!/editProfile"){
                    $state.go('settings');
                }else if (window.location.hash=="#!/registerUser"){
                    $state.go('login');
                }
                else {
                    console.log(window.location.hash);
                    navigator.app.backHistory();
                }
            }, false);


            if(localStorage.getItem('usr') != null){
                $state.go('profile');
            }else{
                $state.go('login');
            }
            // Enable to debug issues.
            // window.plugins.OneSignal.setLogLevel({logLevel: 4, visualLevel: 4});

            window.plugins.OneSignal
                .startInit("37a9139e-f5c2-4b7c-885a-6c4556001b31")
                .handleNotificationReceived(function(jsonData){
                    console.log("Notification received:\n" + JSON.stringify(jsonData));
                    console.log('Did I receive a notification: ' + JSON.stringify(jsonData));
                })
                .handleNotificationOpened(function(jsonData){
                    console.log("Notification opened:\n" + JSON.stringify(jsonData));
                    console.log('didOpenRemoteNotificationCallBack: ' + JSON.stringify(jsonData));
                    console.log(jsonData.notification.payload.additionalData.notificationState);
                    var notificationState = jsonData.notification.payload.additionalData.notificationState;
                    switch(notificationState){
                        case 'solicitudAmistad': $state.go('notifications');break;
                        default: console.log("la no risa");break;
                    }
                })
                .inFocusDisplaying(window.plugins.OneSignal.OSInFocusDisplayOption.Notification)

                .endInit();

            window.plugins.OneSignal.registerForPushNotifications();

            window.plugins.OneSignal.getIds(
                function(ids) {
                    console.log('getIds: ' + JSON.stringify(ids));
                    localStorage.setItem("deviceId",JSON.stringify(ids));
                }
            );

            // Call syncHashedEmail anywhere in your app if you have the user's email.
            // This improves the effectiveness of OneSignal's "best-time" notification scheduling feature.
            // window.plugins.OneSignal.syncHashedEmail(userEmail);
            navigator.splashscreen.hide();
        }, false);
    };
}]);