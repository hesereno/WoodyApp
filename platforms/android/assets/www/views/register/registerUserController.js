'use strict'
var app = angular.module('woodyApp.registerUser', []);

app.controller('registerUserController',  ['$scope', '$rootScope', '$state', '$http', function($scope, $rootScope, $state, $http){

    $scope.back = function () {
        $state.go('login');
    };

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

        var username = document.getElementById("username").value;
        var pass = document.getElementById("password").value;
        var repass = document.getElementById("rePassword").value;
        var num = document.getElementById("nPerros").value;

        var nombre = document.getElementById("nombre").value;
        var apellidos = document.getElementById("apellidos").value;

        if(checkUser(username)){
            alert("Este nombre de usuario esta en uso");
        }else if(!checkPassword(pass, repass)){
            alert("La contraseña tiene que tener mas de 6 caracteres y coincidir");
        }else if(checkSomethingNull()){
            alert("Rellena todos los campos");
        }else{
            var token = JSON.parse(localStorage.getItem("deviceId")).userId;
            var user = {"username": username, "pass": pass, "nDogs": num, "token":token, "nombre":nombre, "apellidos":apellidos};
            $rootScope.numero = user.nDogs;
            var test = JSON.stringify(user);
            localStorage.setItem("user", test);
            console.log(test);

            for (var i = 0; i < num; i++) {
                var mascotaName = document.getElementsByClassName("petname")[i].value;
                var fecha = document.getElementsByClassName("date")[i].value;
                var sexo = document.getElementsByClassName("macho")[i].checked;
                if(sexo){
                    sexo = "M";
                }else{
                    sexo = "H";
                }
                $scope.mascota.push({"petname": mascotaName, "date": fecha, "sexo":sexo});
            }
            var userData = JSON.parse(test);
            var data = [];
            data[0] = $scope.mascota;
            data[1] = userData;
            //console.log(JSON.stringify(data));

            $http.post('https://www.institutmarianao.cat/woody/registroUsuario.php', data).then(function (response) {
                console.log(response.data);
                console.log(response);

            }, function (response) {
                console.log(response.data);
                console.log(response);
            });

            localStorage.setItem("usr", user.username + ",true");

            for (i = 0; i < $scope.mascotaImg.length; i++) {
                var data = {
                    "img": $scope.mascotaImg[i],
                    "username": user.username,
                    "animal": $scope.mascota[i].petname
                };
                $http.post("https://www.institutmarianao.cat/woody/uploadFile.php", data).then(
                    function (response) {
                        console.log(response);
                    }, function (response) {
                        console.log(response);
                    });
            }
            $state.go('profile');
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


                var img = document.getElementById("imagen" + $scope.actualImg);
                img.onload = function(){
                    var c = document.getElementById("canvas" + $scope.actualImg);
                    c.width = $scope.croppedImage.width;
                    c.height = $scope.croppedImage.height;
                    var ctx = c.getContext("2d");
                    ctx.drawImage(img, 0, 0, $scope.croppedImage.width, $scope.croppedImage.height);
                    var dataUrl = c.toDataURL();
                    var posComa = dataUrl.indexOf(',');
                    dataUrl = dataUrl.substring(posComa + 1);
                    $scope.mascotaImg.push(dataUrl);
                    console.log("fin");
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

    function checkUser(userId){
        var data = {"userId":userId};
        $http.post('https://www.institutmarianao.cat/woody/getUserToken.php', data).then(function (response) {
            console.log(response.data);
            console.log(response);
            $scope.result = response.data;


        }, function (response) {
            console.log(response.data);
            console.log(response);
        });
        if($scope.result == "failed"){
            return false;
        }else{
            return true;
        }
    }

    function checkPassword(pass, repass){
        if(pass == repass && pass.length > 6){
            return true;
        }else{
            return false;
        }
    }

    function checkSomethingNull() {
        var username = document.getElementById("username").value;
        var pass = document.getElementById("password").value;
        var repass = document.getElementById("rePassword").value;
        var num = document.getElementById("nPerros").value;
        var nombre = document.getElementById("nombre").value;
        var apellidos = document.getElementById("apellidos").value;
        var response = false;
        if (username == "" || pass == "" || num == "" || nombre == "" || apellidos == "") {
            response = true;
        }

        for (var i = 0; i < num; i++) {

            var mascotaName = document.getElementsByClassName("petname")[i].value;
            var fecha = document.getElementsByClassName("date")[i].value;
            if (mascotaName == "" || fecha == "") {
                response = true;
            }
        }
        if (response) {
            return true;
        } else {
            return false;
        }
    }

}]);