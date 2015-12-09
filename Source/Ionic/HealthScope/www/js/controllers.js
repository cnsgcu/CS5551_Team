angular.module('app.controllers', ['ngAnimate'])

    /**
     * Slider logic - Tarun
     */
     .controller('SliderController', function($scope) {
        $scope.images=[{src:'img1.png',title:'Pic 1'},
                       {src:'img2.png',title:'Pic 2'},
                       {src:'img3.png',title:'Pic 3'},
                       {src:'img4.png',title:'Pic 4'},
                       {src:'img5.png',title:'Pic 5'},
                       {src:'img6.png',title:'Pic 6'},
                       {src:'img7.png',title:'Pic 7'},
                       {src:'img8.png',title:'Pic 8'}]; 
    })
    
    
    .controller('VideoController', function($scope, $location) {
        
         $scope.showVideo = function(){
            console.log("Here I am being called");
             $location.url("/videoHP");
         } 
    })
    
	/**
     * Doughnut logic - Tarun
     */
    .controller("DoughnutCtrl", function ($scope, UserService, $ionicPopup, $location) {
   
        function actOnSuccess (response) {
            
            if (response.data) {
                
                var jsonData = response.data;
                                                
                if (jsonData.count == 3 || jsonData.count > 3){
                    var record1 = jsonData.records[0].result + " ("+ convertDate(jsonData.records[0].detectedDate) + ")";
                    var record2 = jsonData.records[1].result + " ("+ convertDate(jsonData.records[1].detectedDate) + ")";
                    var record3 = jsonData.records[2].result + " ("+ convertDate(jsonData.records[2].detectedDate) + ")";
                    $scope.labels = [record1, record2, record3]
                    $scope.data = [parseInt(jsonData.records[0].sbp)+parseInt(jsonData.records[0].dbp), 
                                   parseInt(jsonData.records[1].sbp)+parseInt(jsonData.records[1].dbp),
                                   parseInt(jsonData.records[2].sbp)+parseInt(jsonData.records[2].dbp)]
                }
                else if (jsonData.count == 2){
                    $scope.labels = [jsonData.records[0].result, jsonData.records[1].result];
                    $scope.data = [parseInt(jsonData.records[0].sbp)+parseInt(jsonData.records[0].dbp), 
                                   parseInt(jsonData.records[1].sbp)+parseInt(jsonData.records[1].dbp)]
                }
                else if (jsonData.count == 1){
                    $scope.labels = [jsonData.records[0].result];
                    $scope.data = [parseInt(jsonData.records[0].sbp)+parseInt(jsonData.records[0].dbp)]
                }
                              
            } else {
                $ionicPopup.alert({
                    title:'No history for you',
                    okText:'Record data'
                });
                $location.path('/hypertension');
            } 
        };
        
        function actOnError (reason) {
            
            $ionicPopup.alert({
                    title:'Connection Error',
                    okText:'Try Again'
                });
            $location.path('/hypertension');             
        };
        
        function convertDate (stringDate){
            var month = stringDate.substring(4, 7);
            if (month == 'Dec') month = '12';
            if (month == 'Nov') month = '11';
            if (month == 'Oct') month = '10';
            if (month == 'Sep') month = '09';
            if (month == 'Aug') month = '08';
            if (month == 'Jul') month = '07';
            if (month == 'Jun') month = '06';
            if (month == 'May') month = '05';
            if (month == 'Apr') month = '04';
            if (month == 'Mar') month = '03';
            if (month == 'Feb') month = '02';
            if (month == 'Jan') month = '01';
            return month+"/"+stringDate.substring(8, 10);
        }
   
		var id = sessionStorage.getItem("userID");
        //var jsonID = { "usrId": id};
        UserService.historyHypertension(id).then(actOnSuccess, actOnError);        
    })
    
	/**
     * Bar chart logic - Tarun
     */
    .controller("BarCtrl", function ($scope, UserService, $ionicPopup, $location) {
        
        var id = sessionStorage.getItem("userID");
        //var jsonID = { "usrId": id};
        UserService.historyHypertension(id).then(actOnSuccess, actOnError);
        
        function actOnSuccess (response) {
            
            if (response.data) {
                
                var jsonData = response.data;
                                
                if (jsonData.count == 3 || jsonData.count > 3){
                    
                     var label1 = convertDate(jsonData.records[0].detectedDate);
                     var label2 = convertDate(jsonData.records[1].detectedDate);
                     var label3 = convertDate(jsonData.records[2].detectedDate);
                     $scope.labels = [label1, label2, label3];
                     $scope.series = ['SBP', 'DBP'];

                     $scope.data = [
                                    [parseInt(jsonData.records[0].sbp), parseInt(jsonData.records[1].sbp), parseInt(jsonData.records[2].sbp)],
                                    [parseInt(jsonData.records[0].dbp), parseInt(jsonData.records[1].dbp), parseInt(jsonData.records[2].dbp)]
                                   ];                    
                }
                else if (jsonData.count == 2){
                    
                    var label11 = convertDate(jsonData.records[0].detectedDate);
                    var label22 = convertDate(jsonData.records[1].detectedDate);
                    $scope.labels = [label11, label22];
                    $scope.series = ['SBP', 'DBP'];

                    $scope.data = [
                                    [parseInt(jsonData.records[0].sbp), parseInt(jsonData.records[1].sbp)],
                                    [parseInt(jsonData.records[0].dbp), parseInt(jsonData.records[1].dbp)]
                                   ];                      
                }
                else if (jsonData.count == 1){
                    
                    var label111 = convertDate(jsonData.records[0].detectedDate);
                    $scope.labels = [label111];
                    $scope.series = ['SBP', 'DBP'];

                    $scope.data = [[parseInt(jsonData.records[0].sbp)], [parseInt(jsonData.records[0].dbp)]];  
                }      
            }
            else {
                
                $ionicPopup.alert({
                    title:'No history for you',
                    okText:'Record data'
                });
                $location.path('/hypertension');    
            }
        };
        
        function actOnError (reason) {
            
            $ionicPopup.alert({
                    title:'Connection Error',
                    okText:'Try Again'
                });
            $location.path('/hypertension');             
        };
        
         function convertDate (stringDate){
            var year = stringDate.substring(26, 28);
            var month = stringDate.substring(4, 7);
            var day = stringDate.substring(8, 10);
            if (month == 'Dec') month = '12';
            if (month == 'Nov') month = '11';
            if (month == 'Oct') month = '10';
            if (month == 'Sep') month = '09';
            if (month == 'Aug') month = '08';
            if (month == 'Jul') month = '07';
            if (month == 'Jun') month = '06';
            if (month == 'May') month = '05';
            if (month == 'Apr') month = '04';
            if (month == 'Mar') month = '03';
            if (month == 'Feb') month = '02';
            if (month == 'Jan') month = '01';
            return month + "/" + day + "/" + year;
        };
    })
    
    /**
     * Hypertension History - Tarun
     */
    .controller('HypertensionHistoryController', function($scope) {
        
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
                    title:'Your result is ' + user['result'],
                    okText:'Home'
                });
                
            } else {
                $scope.sbp = "";
                $scope.dbp = "";
                $ionicPopup.alert({
                    title:'Wrong JSON',
                    okText:'Try Again'
                });                 
            } 
        };
        
        function actOnError (reason) {
            $scope.sbp = "";
            $scope.dbp = "";
            $ionicPopup.alert({
                title:'Check your connection',
                okText:'Try Again'
            });                  
        };
        
        $scope.doRecord = function (record) {
                if (record == null) {
                    $ionicPopup.alert({
                        title: 'Please enter data',
                        okText: 'Try Again'
                    });                      
                }
             
                else {
                    
                    if (typeof record.sbp === 'undefined' || record.sbp == "" || record.sbp == null){
                        console.log("SBP is empty");
                        var alertPopupSBP = $ionicPopup.alert({
                                        title: 'Please enter SBP',
                                        okText: 'Try Again'
                                     });
                        alertPopupSBP.then(function() {            
                             $scope.sbp = "";
                             //$scope.dbp = "";
                             record.sbp = "";
                             //record.dbp = "";
                        });     
                    }
                    else if (typeof record.dbp === 'undefined' || record.dbp == "" || record.dbp == null){
                        console.log("DBP is empty");
                        var alertPopupDBP = $ionicPopup.alert({
                                        title: 'Please enter DBP',
                                        okText: 'Try Again'
                                     });
                        alertPopupDBP.then(function() {            
                             //$scope.sbp = "";
                             $scope.dbp = "";
                             //record.sbp = "";
                             record.dbp = "";
                        });     
                    }
                    else {
                        record.id = sessionStorage.getItem("userID");
                        UserService.recordHypertension(record).then(actOnSuccess, actOnError);
                    }
                }
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
    })
    
    .controller('Overweight', function($scope, $ionicPopup, OverweightDetectionService) {
        $scope.diagnosis = {
            'height'   : '_ _ _',
            'weightLbs': '_ _ _',
            'bmi'      : '_ _ _',
            'result'   : '_ _ _',
            'gender'   : '_ _ _'
        };

        
        function actOnSuccess (response) {
            var data = response.data;
            
            $scope.diagnosis['weightLbs'] = data['weightLbs'] + " lbs";
            $scope.diagnosis['bmi'] = parseFloat(data['bmi']).toFixed(2);
            $scope.diagnosis['result'] = data['diagnosis'];
            $scope.diagnosis['height'] = Math.floor(data['heightInch'] / 12) + "' " + parseFloat((data['heightInch'] % 12) / 12).toFixed(2).substring(2) + '"';
            $scope.diagnosis['gender'] = data['gender'];
        };
        
        function actOnError (response) {
            console.log(response);
        };
        
        $scope.showForm = function() {
            $scope.form = {'gender': 'Male'};
            
            var overweightForm = $ionicPopup.show({
                scope: $scope,
                title: 'Medical Information',
                templateUrl: 'templates/overweight_form.html',
                buttons: [
                    { text: 'Cancel' },
                    {
                        text: '<b>Detect</b>',
                        type: 'button-positive',
                        onTap: function(e) {
                            if (!$scope.form) {
                                e.preventDefault();
                            } else {
                                return $scope.form;
                            }
                        }
                    }
                ]
            });
            
            overweightForm.then(function(form) {
                OverweightDetectionService.detect(form).then(actOnSuccess, actOnError);
            });
        }
    });