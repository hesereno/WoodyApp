'use strict';
var app = angular.module('woodyApp.registerPersona', []);

app.controller('RegisterPersonaController',  ['$scope', '$rootScope', '$http', function($scope, $rootScope, $http){

    $scope.mascota = [];
    $scope.mascotaImg = [];

    $scope.changeNumber = function(){
        var nPerros = document.getElementById("nPerros").value;
        if(nPerros == ""){
            $scope.numero = new Array(0);
        }else{
            $scope.numero = new Array(parseInt(nPerros));
            console.log($scope.numero.length);
        }
    };

    $scope.registre = function() {

        var nombre = document.getElementById("username").value;
        var pass = document.getElementById("password").value;
        var repass = document.getElementById("rePassword").value;
        var num = document.getElementById("nPerros").value;

        var user = {"username": nombre, "pass": pass, "nDogs": num};
        $rootScope.numero = user.nDogs;
        var test = JSON.stringify(user);
        localStorage.setItem("user",test);
        console.log(test);

        for(var i = 0; i < num; i++){
            var mascotaName = document.getElementsByClassName("petname")[i].value;
            var fecha = document.getElementsByClassName("date")[i].value;
            $scope.mascota[i] = {"petname":mascotaName, "date":fecha};
        }
        var userData = JSON.parse(test);
        var data = [];
        data[0] = $scope.mascota;
        data[1] = userData;
        //console.log(JSON.stringify(data));

        $http.post('https://www.institutmarianao.cat/woody/loginMascota.php', data).
        then(function(response) {
            console.log(response.data);
            console.log(response);
        },function(response) {
            console.log(response.data);
            console.log(response);
        });

        localStorage.setItem("usr", user.username + ",true");

        for(i = 0; i < $scope.mascotaImg.length; i++){
            var data = {"img":$scope.mascotaImg[i], "username":user.username, "animal":$scope.mascota[i].petname};
            $http.post("https://www.institutmarianao.cat/woody/uploadFile.php",data).then(
                function(response){
                    console.log(response);
                },function(response){
                    console.log(response);
                });
        }

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

            //console.log(imageUri);
            $scope.imageUri = imageUri;
            $scope.mascotaImg.push($scope.imageUri);

        }, function cameraError(error) {
            console.debug("Unable to obtain picture: " + error, "app");

        }, options);
    };

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
    };

    function setOptions(srcType) {
        var options = {
            // Some common settings are 20, 50, and 100
            quality: 50,
            destinationType: Camera.DestinationType.DATA_URL,
            // In this app, dynamically set the picture source, Camera or photo gallery
            sourceType: srcType,
            encodingType: Camera.EncodingType.JPEG,
            mediaType: Camera.MediaType.PICTURE,
            allowEdit: true,
            correctOrientation: true  //Corrects Android orientation quirks
        }
        return options;
    };

    }]);
