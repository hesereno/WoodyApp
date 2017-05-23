'use strict';
var app = angular.module('woodyApp.registerAnimal', []);

app.controller('RegisterAnimalController', ['$scope', '$http', '$rootScope', function($scope, $http, $rootScope){

    $scope.mascota = [];
    $scope.showImg = false;

    $scope.initView = function(){
        $scope.numero = new Array(parseInt($rootScope.numero));
        console.log($rootScope.numero);
    }

    $scope.registrarAnimales = function(){

        for(var i = 0; i < $rootScope.numero; i++){
            var mascotaName = document.getElementsByClassName("petname")[i].value;
            var fecha = document.getElementsByClassName("date")[i].value;
            $scope.mascota[i] = {"petname":mascotaName, "date":fecha};
            //consulta += "petname" + i + "="+ mascotaName +"&petdate"+i+"="+fecha+"&"
        }
        console.log("entra");
        console.log($scope.mascota);
        var test = localStorage.getItem('user');
        console.log(test);
        var userData = JSON.parse(test);
        var data = [];
        data[0] = $scope.mascota;
        data[1] = userData;
        console.log(JSON.stringify(data));

        $http.post('https://www.institutmarianao.cat/woody/loginMascota.php', data).
        then(function(response) {
            console.log(response.data);
            console.log(response);
        });
    };

    $scope.openFilePicker = function(selection) {

        var srcType = Camera.PictureSourceType.SAVEDPHOTOALBUM;
        var options = setOptions(srcType);
        var func = createNewFileEntry;

        if (selection == "picker-thmb") {
            // To downscale a selected image,
            // Camera.EncodingType (e.g., JPEG) must match the selected image type.
            options.targetHeight = 100;
            options.targetWidth = 100;
        }

        navigator.camera.getPicture(function cameraSuccess(imageUri) {

            console.log(imageUri);

        }, function cameraError(error) {
            console.debug("Unable to obtain picture: " + error, "app");

        }, options);
    }

    function createNewFileEntry(imgUri) {
        window.resolveLocalFileSystemURL(cordova.file.cacheDirectory, function success(dirEntry) {

            // JPEG file
            dirEntry.getFile("tempFile.jpeg", { create: true, exclusive: false }, function (fileEntry) {

                // Do something with it, like write to it, upload it, etc.
                // writeFile(fileEntry, imgUri);
                console.log("got file: " + fileEntry.fullPath);
                // displayFileData(fileEntry.fullPath, "File copied to");

            }, onErrorCreateFile);

        }, onErrorResolveUrl);
    }

    function setOptions(srcType) {
        var options = {
            // Some common settings are 20, 50, and 100
            quality: 50,
            destinationType: Camera.DestinationType.FILE_URI,
            // In this app, dynamically set the picture source, Camera or photo gallery
            sourceType: srcType,
            encodingType: Camera.EncodingType.JPEG,
            mediaType: Camera.MediaType.PICTURE,
            allowEdit: true,
            correctOrientation: true  //Corrects Android orientation quirks
        }
        return options;
    }
}]);
