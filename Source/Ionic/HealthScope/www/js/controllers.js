angular.module('app.controllers', [])

    /**
     * Hypertension - Tarun
     */
    .controller('Hypertension', function ($scope, $cordovaVibration) {
        $scope.detectLogic = function (sbp, dbp) {
            // Do some computation..
            var sbpValue = parseFloat(sbp);
            var dbpValue = parseFloat(dbp);

            if (isNaN(sbpValue) || isNaN(dbpValue))
                return {
                    "classNameForResult": "codered",
                    "results": "Please enter the values correctly."
                }

            if (sbpValue < 110 && dbpValue < 140)
                return {
                    "classNameForResult": "codegreen",
                    "results": "Normal : You don't have hypertension."
                }

            if (sbpValue >= 120 && sbpValue <= 139 && dbpValue < 90)
                return {
                    "classNameForResult": "card",
                    "results": "You have Pre-Hypertension."
                }

            if (sbpValue >= 140 && sbpValue <= 159 && dbpValue >= 100)
                return {
                    "classNameForResult": "card",
                    "results": "You have State 1 Hypertension."
                }


            if (sbpValue >= 160 && sbpValue <= 179 && dbpValue >= 110)
                return {
                    "classNameForResult": "card",
                    "results": "You have State 2 Hypertension."
                }

            if (sbpValue >= 180 || dbpValue >= 110)
                return {
                    "classNameForResult": "codered",
                    "results": "You have stage 3 Hypertension (severe)."
                }
        }

        $scope.detectView = function (style) {
            document.getElementById("result").innerHTML = style["results"];
            document.getElementById("result").className = style["classNameForResult"];
            document.getElementById("suggestion").className = style["classNameForSuggestion"];
            $cordovaVibration.vibrate(200);
        }
    })

    /**
     * Diabetes - Ting
     */
    .controller('DiaDet', function ($scope, $http) {
        $scope.diaDetectLogic = function (diaData1, diaData2) {
            // Do some computation..
            var diaValue1 = parseFloat(diaData1);
            console.log(diaValue1);
            var diaValue2 = parseFloat(diaData2);
            console.log(diaValue2);
            if (isNaN(diaValue1) || isNaN(diaValue2))
                return {
                    "classNameForResult": "codered",
                    "results": "Please enter the values correctly."
                }

            console.log("record the parameters");
            $http({
                method: 'PUT',
                url: 'https://api.mongolab.com/api/1/databases/ase/collections/users/' + sessionStorage.getItem("userID") + '?apiKey=TFqu35e8BmE9SBB3fRgCe6MpqUcqKWBi',
                data: JSON.stringify({
                    "$set": {
                        "sugarFast": diaValue1,
                        "sugar2H": diaValue2
                    }
                }),
                contentType: "application/json"
            }).success(function (data) {
                console.log(data);
            })

            if (diaValue1 < 110 && diaValue2 < 140) {
                return {
                    "classNameForResult": "card",
                    "classNameForSuggestion": "bar bar-footer bar-balanced",
                    "results": "Normal"
                }
            }
            if (diaValue1 < 126 && diaValue1 >= 110 && diaValue2 < 140)
                return {
                    "classNameForResult": "card",
                    "classNameForSuggestion": "bar bar-footer bar-balanced",
                    "results": "Impaired fasting glycaemia glucose: more commonly known as pre-diabetes refers to a condition in which the fasting blood glucose level is consistently elevated above what is considered normal levels; however, it is not high enough to be diagnosed as diabetes mellitus."
                }
            if (diaValue1 < 126 && diaValue2 >= 140 && diaValue2 < 200)
                return {
                    "classNameForResult": "card",
                    "classNameForSuggestion": "bar bar-footer bar-balanced",
                    "results": "Impaired glucose tolerance(IGT): is a pre-diabetic state of hyperglycemia that is associated with insulin resistance and increased risk of cardiovascular pathology. IGT may precede type 2 diabetes mellitus by many years. IGT is also a risk factor for mortality."
                }
            if (diaValue1 >= 126 || diaValue2 >= 200)
                return {
                    "classNameForResult": "card",
                    "classNameForSuggestion": "bar bar-footer bar-balanced",
                    "results": "Diabetes mellitus: A positive result, in the absence of unequivocal high blood sugar, should be confirmed by a repeat of any of the above methods on a different day. It is preferable to measure a fasting glucose level because of the ease of measurement and the considerable time commitment of formal glucose tolerance testing, which takes two hours to complete and offers no prognostic advantage over the fasting test.According to the current definition, two fasting glucose measurements above 126 mg/dl (7.0 mmol/l) is considered diagnostic for diabetes mellitus."
                }
        }

        $scope.diaDetectView = function (style) {
            document.getElementById("result").className = style["classNameForResult"];
            document.getElementById("suggestion").className = style["classNameForSuggestion"];
            console.log(style["classNameForSuggestion"]);
            document.getElementById("result").innerHTML = style["results"];
        }

        $scope.clearSearch = function () {
            $scope.diaData1 = "";
            $scope.diaData2 = "";
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
                title:'Check your connection ' + JSON.stringify(reason),
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