var app = angular.module('woodyApp.notifications', []);

app.controller('notificationsController',  ['$scope', '$http', function($scope, $http) {
    $scope.view = "notifications";

    $scope.initView = function(){
        var userData = localStorage.getItem("usr");
        userData = userData.substring(0, userData.indexOf(','));
        console.log(userData);
        var data = {"userId":userData};
        $http.post("https://www.institutmarianao.cat/woody/getNotificationInfo.php", data).then(
            function(response){
                console.log(response);
                console.log(response.data);
                $scope.notifications = response.data;
            },function(response){
                console.log(response);
            });
    }

    $scope.acceptNotification = function(){

    }
}]);