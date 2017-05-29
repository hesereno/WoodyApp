'use strict'
var app = angular.module('woodyApp.editProfile', [

]);

app.controller('editProfileController', ['$scope', '$http', '$state', function($scope, $http, $state){

    $scope.editDog = false;

    $scope.buttonPaw = function(){
        $scope.editDog = true;
    };

    $scope.buttonUser = function(){
        $scope.editDog = false;
    }

    $scope.left = function () {
        $state.go("profile")
    };

    document.addEventListener("backbutton", function(){
        $state.go('profile');
    }, false);

    $scope.initView= function(){
        var username = localStorage.getItem('usr');
        var coma = username.indexOf(',');

        $scope.username = username.substring(0, coma);

        $http.get('https://www.institutmarianao.cat/woody/profileInfo.php?username='+ $scope.username).
        then(function(response) {
            console.log(response.data);
            for(var i = 0; i < response.data.length; i++){
                var string = response.data[i];
                response.data[i] = JSON.parse(string);
            }
            $scope.perros = response.data;
            console.log($scope.perros);
            console.log($scope.perros[0].dogName);
            console.log(response);
        });
    };

    $scope.guardarCambios = function(){

        if($scope.editDog){
            var nombreMascota = document.getElementById('petname').value;

        }else{
            var nuevaPass = document.getElementById('password').value;

        }
    };

    $scope.openFilePicker = function(selection) {

        var srcType = Camera.PictureSourceType.SAVEDPHOTOALBUM;
        var options = setOptions(srcType);
        var func = createNewFileEntry;
        $scope.actualImg = selection;

        if (selection == "picker-thmb") {
            // To downscale a selected image,
            // Camera.EncodingType (e.g., JPEG) must match the selected image type.
            options.targetHeight = 100;
            options.targetWidth = 100;
        }

        navigator.camera.getPicture(function cameraSuccess(imageUri) {

            //console.log(imageUri);
            $scope.imageUri = imageUri;
            var options = {
                url: imageUri,
                title: "test",       // optional. android only. (here you can put title of image cropper activity) default: Image Cropper
                ratio: "1/1",
                autoZoomEnabled: false      // optional. android only. for iOS its always true (if it is true then cropper will automatically adjust the view) default: true
            };
            window.plugins.k.imagecropper.open(options, function(data) {
                // its return an object with the cropped image cached url, cropped width & height, you need to manually delete the image from the application cache.
                console.log(data);
                $scope.croppedImage = data;


                if($scope.editDog){
                    var img = document.getElementById("imgMascota" + $scope.actualImg);
                }else{
                    var img = document.getElementById("imgProfile");
                }
                img.onload = function(){
                    if($scope.editDog){
                        var c = document.getElementById("canvas" + $scope.actualImg);
                    }else{
                        var c = document.getElementById("canvas");
                    }
                    c.width = $scope.croppedImage.width;
                    c.height = $scope.croppedImage.height;
                    var ctx = c.getContext("2d");
                    ctx.drawImage(img, 0, 0, $scope.croppedImage.width, $scope.croppedImage.height);
                    var dataUrl = c.toDataURL();
                    var posComa = dataUrl.indexOf(',');
                    dataUrl = dataUrl.substring(posComa + 1);
                    $scope.mascotaImg = dataUrl;
                    console.log(dataUrl);

                    if($scope.editDog){
                        var mascota = document.getElementById("petname").textContent;
                    }else{
                        var mascota = "";
                    }
                    var data = {"img":$scope.mascotaImg, "username":$scope.username, "animal":mascota};
                    $http.post("https://www.institutmarianao.cat/woody/uploadFile.php",data).then(
                        function(response){
                            console.log(response);
                        },function(response){
                            console.log(response);
                        });
                };
                img.src = $scope.croppedImage.imgPath;



            }, function(error) {
                console.log(error);
            });

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
            destinationType: Camera.DestinationType.FILE_URI,
            // In this app, dynamically set the picture source, Camera or photo gallery
            sourceType: srcType,
            encodingType: Camera.EncodingType.JPEG,
            mediaType: Camera.MediaType.PICTURE,
            allowEdit: false,
            correctOrientation: true  //Corrects Android orientation quirks
        }
        return options;
    };

}]);