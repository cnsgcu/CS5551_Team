angular.module('app.controllers', ['ngAnimate'])

    /**
     * Slider logic - Tarun
     */
    .controller('SliderController', function($scope) {
        $scope.images=[{src:'img1.png',title:'Pic 1'},
                       {src:'img2.jpg',title:'Pic 2'},
                       {src:'img3.jpg',title:'Pic 3'},
                       {src:'img4.png',title:'Pic 4'},
                       {src:'img5.png',title:'Pic 5'}]; 
    })
 
    /**
     * Hypertension - Tarun
     */
    .controller('Hypertension', function ($scope, UserService, $location, $ionicPopup, $cordovaVibration) {
            
        function actOnSuccess (response) {
            
            if (response.data) {
                var user = response.data;
                console.log ("Response from the server : "+ JSON.stringify(user));
                $ionicPopup.alert({
                    title:'Your result it ' + user['result'],
                    okText:'Home'
                });
                //$location.path('/home/' + user['name']);
            } else {
                //var alertPopup = $ionicPopup.alert({
                $ionicPopup.alert({
                    title:'Wrong JSON',
                    okText:'Try Again'
                });
                /*alertPopup.then(function(){
                    reset(); 
                }); */   
            } 
        };
        
        function actOnError (reason) {
            $ionicPopup.alert({
                title:'Check your connection',
                okText:'Try Again'
            });                  
        };
        
        $scope.doRecord = function (record) {
                record.id = sessionStorage.getItem("userID");
                console.log(record);
                UserService.recordHypertension(record).then(actOnSuccess, actOnError);
            };
    })

    /**
     * Diabetes - Ting
     */
   .controller('DiaDet', function ($scope, UserService, $location, $ionicPopup, $cordovaVibration) {
            
        function actOnSuccess (response) {
            
            if (response.data) {
                var user = response.data;
                console.log ("Response from the server : "+ JSON.stringify(user));
                $ionicPopup.alert({
                    title:'Your result is ' + user['result'],
                    okText:'Home'
                });
                //$location.path('/home/' + user['name']);
            } else {
                //var alertPopup = $ionicPopup.alert({
                $ionicPopup.alert({
                    title:'Wrong JSON',
                    okText:'Try Again'
                });
                /*alertPopup.then(function(){
                    reset(); 
                }); */   
            } 
        };
        
        function actOnError (reason) {
            $ionicPopup.alert({
                title:'Check your connection',
                okText:'Try Again'
            });                  
        };
        
        $scope.doRecord = function (record) {
                record.id = sessionStorage.getItem("userID");
                console.log(record);
                UserService.recordDiabetes(record).then(actOnSuccess, actOnError);
            };
    })

.controller('DiaSug',function($scope, Items){

$(document).ready(function () { 
    $(function () {
        $('#Proteins').click(function (e) {
        e.preventDefault();
        $('#Proteins').next().toggle();
    });
        $('#GrainsAndStarchyFoods').click(function (e) {
        e.preventDefault();
        $('#GrainsAndStarchyFoods').next().toggle();
    });
        $('#Non-StarchyVegetables').click(function (e) {
        e.preventDefault();
        $('#Non-StarchyVegetables').next().toggle();
        });
    });
    
    $scope.ProteinItems = Items.allProtein();
    $scope.GrainsAndStarchyFoodItems = Items.allGrainsAndStarchy();
    $scope.NonStarchyVegetableItems = Items.allNonStarchyVegetable();
    
    $scope.show=function(item){
        $("#tip").html("Tips:");
        var img = document.createElement("IMG");
        img.src =item.picture;
        console.log(item.id);
        if(item.id>=0 && item.id<=10){
            $("#protein").html("Protein");
            $("#proteinName").html(item.name);
            if (document.getElementById('proteinImage').lastChild==null)
                document.getElementById('proteinImage').appendChild(img);
            else{ document.getElementById('proteinImage').removeChild(document.getElementById('proteinImage').lastChild);
                document.getElementById('proteinImage').appendChild(img);
                }
            $("#proteinTip").html(item.tip);
        }
        else if(item.id>=11 && item.id<=24){
            $("#Grain").html("Grains and Starchy Food");
            $("#GrainsAndStarchyFoodName").html(item.name);
            if (document.getElementById('GrainsAndStarchyFoodImage').lastChild==null)
                document.getElementById('GrainsAndStarchyFoodImage').appendChild(img);
            else{ document.getElementById('GrainsAndStarchyFoodImage').removeChild(document.getElementById('GrainsAndStarchyFoodImage').lastChild);
                document.getElementById('GrainsAndStarchyFoodImage').appendChild(img);
                }
            $("#GrainsAndStarchyFoodTip").html(item.tip);
        }
        else{
            $("#vegi").html("Non-Starchy Vegetable");
            $("#Non-StarchyVegetableName").html(item.name);
            if (document.getElementById('Non-StarchyVegetableImage').lastChild==null)
                document.getElementById('Non-StarchyVegetableImage').appendChild(img);
            else{ document.getElementById('Non-StarchyVegetableImage').removeChild(document.getElementById('Non-StarchyVegetableImage').lastChild);
                document.getElementById('Non-StarchyVegetableImage').appendChild(img);
                }
            $("#Non-StarchyVegetableTip").html(item.tip);
        }        
    }
});
})

    /**
     * Sign up - Cuong
     */
    .controller('SignupCtrl', function ($scope, $location, $cordovaCamera, $ionicPopup, UserService) {
        function reset() {
            $scope.user = {
                'dob': '',
                'name': '',
                'email': '',
                'password': '',
                'repassword': ''
            };
        };
        
        function actOnSuccess (response) {
            $location.path('/');
            reset();
        };
        
        function actOnError (reason) {
            console.log('Failed: ' + reason);
        };

        reset();

        $scope.doSubmit = function () {
            var newUser = JSON.parse(JSON.stringify($scope.user));
            delete newUser['repassword'];

            UserService.create(newUser).then(actOnSuccess, actOnError);
        };
        
        $scope.takePicture = function() {
            var options = {
                quality: 80,
                destinationType: Camera.DestinationType.DATA_URL,
                sourceType: Camera.PictureSourceType.CAMERA,
                allowEdit: true,
                encodingType: Camera.EncodingType.JPEG,
                targetWidth: 250,
                targetHeight: 250,
                popoverOptions: CameraPopoverOptions,
                saveToPhotoAlbum: false
            };
            
            $cordovaCamera.getPicture(options).then(function(imageData) {
                $scope.srcImage = "data:image/jpeg;base64," + imageData;
            }, function(err) {
                $ionicPopup.alert({
                    title: JSON.parse(err),
                    okText:'Try Again'
                });
            });
        };
    })
    
    /**
     * Login - Cuong
     */
    .controller('LoginCtrl', function ($scope, $location, $ionicPopup, UserService) {
        function reset() {
            $scope.credential = { 'email': '', 'password': '' };
        }
        
        function actOnSuccess (response) {
            if (response.data.length == 1) {
                var user = response.data[0];
                
                sessionStorage.setItem("userID", user['id']); // Changes done by Tarun to store User ID (from mongoDB) session
                $location.path('/home/' + user['name']);
            } else {
                var alertPopup = $ionicPopup.alert({
                    title:'Wrong Credentials',
                    okText:'Try Again'
                });
                alertPopup.then(function(){
                    reset(); 
                });    
            }
        };
        
        function actOnError (reason) {
            var alertPopup = $ionicPopup.alert({
                title:'Check your connection ',
                okText:'Try Again'
            });
            alertPopup.then(function(){
               reset(); 
            });
        };
        
        reset();

        $scope.doLogin = function (credential) {
            UserService.identify(credential).then(actOnSuccess, actOnError);
        };
    })
    
    /**
     * Home - Cuong
     */
    .controller('HomeCtrl', function ($scope, $stateParams) {
        $scope.user_name = $stateParams.name;
    });