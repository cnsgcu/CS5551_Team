angular.module('app.controllers', ['ngAnimate'])

    /**
     * Slider logic - Tarun
     */
    .controller('SliderController', function ($scope) {
        $scope.images = [{src: 'img1.png', title: 'Pic 1'},
            {src: 'img2.png', title: 'Pic 2'},
            {src: 'img3.png', title: 'Pic 3'},
            {src: 'img4.png', title: 'Pic 4'},
            {src: 'img5.png', title: 'Pic 5'},
            {src: 'img6.png', title: 'Pic 6'},
            {src: 'img7.png', title: 'Pic 7'},
            {src: 'img8.png', title: 'Pic 8'}];
    })


    .controller('VideoController', function ($scope, $location) {

        $scope.showVideo = function () {
            console.log("Here I am being called");
            $location.url("/videoHP");
        }
    })

    /**
     * Doughnut logic - Tarun
     */
    .controller("DoughnutCtrl", function ($scope, UserService, $ionicPopup, $location) {

        function actOnSuccess(response) {

            if (response.data) {

                var jsonData = response.data;

                if (jsonData.count == 3 || jsonData.count > 3) {
                    var record1 = jsonData.records[0].result + " (" + convertDate(jsonData.records[0].detectedDate) + ")";
                    var record2 = jsonData.records[1].result + " (" + convertDate(jsonData.records[1].detectedDate) + ")";
                    var record3 = jsonData.records[2].result + " (" + convertDate(jsonData.records[2].detectedDate) + ")";
                    $scope.labels = [record1, record2, record3]
                    $scope.data = [parseInt(jsonData.records[0].sbp) + parseInt(jsonData.records[0].dbp),
                        parseInt(jsonData.records[1].sbp) + parseInt(jsonData.records[1].dbp),
                        parseInt(jsonData.records[2].sbp) + parseInt(jsonData.records[2].dbp)]
                }
                else if (jsonData.count == 2) {
                    $scope.labels = [jsonData.records[0].result, jsonData.records[1].result];
                    $scope.data = [parseInt(jsonData.records[0].sbp) + parseInt(jsonData.records[0].dbp),
                        parseInt(jsonData.records[1].sbp) + parseInt(jsonData.records[1].dbp)]
                }
                else if (jsonData.count == 1) {
                    $scope.labels = [jsonData.records[0].result];
                    $scope.data = [parseInt(jsonData.records[0].sbp) + parseInt(jsonData.records[0].dbp)]
                }

            } else {
                $ionicPopup.alert({
                    title: 'No history for you',
                    okText: 'Record data'
                });
                $location.path('/hypertension');
            }
        };

        function actOnError(reason) {

            $ionicPopup.alert({
                title: 'Connection Error',
                okText: 'Try Again'
            });
            $location.path('/hypertension');
        };

        function convertDate(stringDate) {
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
            return month + "/" + stringDate.substring(8, 10);
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

        function actOnSuccess(response) {

            if (response.data) {

                var jsonData = response.data;

                if (jsonData.count == 3 || jsonData.count > 3) {

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
                else if (jsonData.count == 2) {

                    var label11 = convertDate(jsonData.records[0].detectedDate);
                    var label22 = convertDate(jsonData.records[1].detectedDate);
                    $scope.labels = [label11, label22];
                    $scope.series = ['SBP', 'DBP'];

                    $scope.data = [
                        [parseInt(jsonData.records[0].sbp), parseInt(jsonData.records[1].sbp)],
                        [parseInt(jsonData.records[0].dbp), parseInt(jsonData.records[1].dbp)]
                    ];
                }
                else if (jsonData.count == 1) {

                    var label111 = convertDate(jsonData.records[0].detectedDate);
                    $scope.labels = [label111];
                    $scope.series = ['SBP', 'DBP'];

                    $scope.data = [[parseInt(jsonData.records[0].sbp)], [parseInt(jsonData.records[0].dbp)]];
                }
            }
            else {

                $ionicPopup.alert({
                    title: 'No history for you',
                    okText: 'Record data'
                });
                $location.path('/hypertension');
            }
        };

        function actOnError(reason) {

            $ionicPopup.alert({
                title: 'Connection Error',
                okText: 'Try Again'
            });
            $location.path('/hypertension');
        };

        function convertDate(stringDate) {
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

    .controller('HypertensionHistoryController', function ($scope) {

    })

    /**
     * Hypertension - Tarun
     */
    .controller('Hypertension', function ($scope, UserService, $location, $ionicPopup, $cordovaVibration) {

        function actOnSuccess(response) {

            if (response.data) {
                var user = response.data;
                console.log("Response from the server : " + JSON.stringify(user));
                $ionicPopup.alert({
                    title: 'Your result is ' + user['result'],
                    okText: 'Home'
                });

            } else {
                $scope.sbp = "";
                $scope.dbp = "";
                $ionicPopup.alert({
                    title: 'Wrong JSON',
                    okText: 'Try Again'
                });
            }
        };

        function actOnError(reason) {
            $scope.sbp = "";
            $scope.dbp = "";
            $ionicPopup.alert({
                title: 'Check your connection',
                okText: 'Try Again'
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

                if (typeof record.sbp === 'undefined' || record.sbp == "" || record.sbp == null) {
                    console.log("SBP is empty");
                    var alertPopupSBP = $ionicPopup.alert({
                        title: 'Please enter SBP',
                        okText: 'Try Again'
                    });
                    alertPopupSBP.then(function () {
                        $scope.sbp = "";
                        //$scope.dbp = "";
                        record.sbp = "";
                        //record.dbp = "";
                    });
                }
                else if (typeof record.dbp === 'undefined' || record.dbp == "" || record.dbp == null) {
                    console.log("DBP is empty");
                    var alertPopupDBP = $ionicPopup.alert({
                        title: 'Please enter DBP',
                        okText: 'Try Again'
                    });
                    alertPopupDBP.then(function () {
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
    .controller('DiaDet', function ($scope, $ionicPopup, DiabetesDetectionService, UserService) {

        $scope.diagnosis = {
            'sugar1': '_ _ _',
            'sugar2': '_ _ _',
            'result': '_ _ _',
        };

        $scope.top = [{
            'sugar1': '',
            'sugar2': '',
            'result': '',
            'detectedDate': '',
        },
            {
                'sugar1': '',
                'sugar2': '',
                'result': '',
                'detectedDate': '',
            },
            {
                'sugar1': '',
                'sugar2': '',
                'result': '',
                'detectedDate': '',
            }];

        function actOnSuccess(response) {
            var data = response.data;
            console.log(data);

            $scope.diagnosis['sugar1'] = data['sugar1'];
            $scope.diagnosis['sugar2'] = data['sugar2'];
            $scope.diagnosis['result'] = data['result'];
        };

        function actSuccess(response) {
            var data = response.data;
            console.log(data);
            for (var i = 0; i < data.count; i++) {
                var record = data.records[i];

                $scope.top[i].sugar1 = record.sugar1;
                console.log(record.sugar1);
                $scope.top[i].sugar2 = record.sugar2;
                $scope.top[i].result = record.result;
                $scope.top[i].detectedDate = record.detectedDate;
            }
            console.log($scope.top);

        };
        function actOnError(response) {
            console.log(response);
        };

        $scope.showForm = function () {
            $scope.form = {};

            var diabetesForm = $ionicPopup.show({
                scope: $scope,
                title: 'Medical Information',
                templateUrl: 'templates/diabetes_form.html',
                buttons: [
                    {text: 'Cancel'},
                    {
                        text: '<b>Detect</b>',
                        type: 'button-positive',
                        onTap: function (e) {
                            if (!$scope.form) {
                                e.preventDefault();
                            } else {
                                diabetesForm.then(function (form) {
                                    console.log(sessionStorage.getItem("userID"));
                                    form.id = sessionStorage.getItem("userID");
                                    DiabetesDetectionService.detect(form).then(actOnSuccess, actOnError);
                                });
                                return $scope.form;
                            }
                        }
                    }
                ]
            });
        }


//        show the lasted three records
        var id = sessionStorage.getItem("userID");
        UserService.diabetesTopHistory(id).then(actSuccess, actOnError);

    })

    .controller('DiaSug', function ($scope, Items) {

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

            $scope.show = function (item) {
                $("#tip").html("Tips:");
                var img = document.createElement("IMG");
                img.src = item.picture;
                console.log(item.id);
                if (item.id >= 0 && item.id <= 10) {
                    $("#protein").html("Protein");
                    $("#proteinName").html(item.name);
                    if (document.getElementById('proteinImage').lastChild == null)
                        document.getElementById('proteinImage').appendChild(img);
                    else {
                        document.getElementById('proteinImage').removeChild(document.getElementById('proteinImage').lastChild);
                        document.getElementById('proteinImage').appendChild(img);
                    }
                    $("#proteinTip").html(item.tip);
                }
                else if (item.id >= 11 && item.id <= 24) {
                    $("#Grain").html("Grains and Starchy Food");
                    $("#GrainsAndStarchyFoodName").html(item.name);
                    if (document.getElementById('GrainsAndStarchyFoodImage').lastChild == null)
                        document.getElementById('GrainsAndStarchyFoodImage').appendChild(img);
                    else {
                        document.getElementById('GrainsAndStarchyFoodImage').removeChild(document.getElementById('GrainsAndStarchyFoodImage').lastChild);
                        document.getElementById('GrainsAndStarchyFoodImage').appendChild(img);
                    }
                    $("#GrainsAndStarchyFoodTip").html(item.tip);
                }
                else {
                    $("#vegi").html("Non-Starchy Vegetable");
                    $("#Non-StarchyVegetableName").html(item.name);
                    if (document.getElementById('Non-StarchyVegetableImage').lastChild == null)
                        document.getElementById('Non-StarchyVegetableImage').appendChild(img);
                    else {
                        document.getElementById('Non-StarchyVegetableImage').removeChild(document.getElementById('Non-StarchyVegetableImage').lastChild);
                        document.getElementById('Non-StarchyVegetableImage').appendChild(img);
                    }
                    $("#Non-StarchyVegetableTip").html(item.tip);
                }
            }
        });
    })

    .controller('DiaHistory', function ($scope, UserService, $location, $ionicPopup, $cordovaVibration) {

        function actOnSuccess(response) {

            if (response.data && response.data.count != 0) {
                var historyData = response.data;
                console.log(historyData);

                var sugar1Data = [], sugar2Data = [], resultsData = [], sugar1, sugar2, results;
                var sugar1Value, sugar2Value, result, timeStamp, timeDate;
                for (var i = 0; i < historyData.count; i++) {
                    sugar1Value = parseInt(historyData.records[i].sugar1);
                    sugar2Value = parseInt(historyData.records[i].sugar2);
                    timeDate = new Date(historyData.records[i].detectedDate);
                    timeStamp = timeDate.getTime();
                    if (historyData.records[i].result == "Normal") result = 1;
                    else if (historyData.records[i].result == "Impaired fasting glycaemia glucose") result = 2;
                    else if (historyData.records[i].result == "Impaired glucose tolerance") result = 3;
                    else if (historyData.records[i].result == "Diabetes mellitus") result = 4;
                    sugar1 = [timeStamp, sugar1Value];
                    sugar2 = [timeStamp, sugar2Value];
                    results = [timeStamp, result];
                    sugar1Data.push(sugar1);
                    sugar2Data.push(sugar2);
                    resultsData.push(results);

                }
                History(sugar1Data, sugar2Data, resultsData);
                $("#result").html("Result Level 1: Normal; Result Level 2: Impaired fasting glycaemia glucose; Result Level 3: Impaired glucose tolerance; Result Level 4: Diabetes mellitus");
            }

            else {
                $ionicPopup.alert({
                    title: 'Do record during selected period',
                    okText: 'Try Again'
                });
            }

        }

        function actOnError(reason) {
            $ionicPopup.alert({
                title: 'Check your connection',
                okText: 'Try Again'
            });
        }

        $scope.doDiaHistory = function (record) {
            record.usrId = sessionStorage.getItem("userID");
            console.log(record);
            UserService.diabetesHistory(record).then(actOnSuccess, actOnError);
        };


        function History(sugar1, sugar2, result) {

            Highcharts.theme = {
                colors: ["#2b908f", "#90ee7e", "#f45b5b", "#7798BF", "#aaeeee", "#ff0066", "#eeaaee",
                    "#55BF3B", "#DF5353", "#7798BF", "#aaeeee"]
            };

            $('#container').highcharts({
                chart: {
                    alignTicks: false
                },

                rangeSelector: {
                    selected: 1
                },

                title: {
                    text: ''
                },

                xAxis: {
                    type: 'datetime',
                    fontSize: "13px"
                },

                yAxis: [{ // Primary yAxis
                    labels: {
                        format: '{value}',
                        style: {
                            color: "#2b908f",
                            fontSize: "13px"
                        }
                    },

                    title: {
                        text: 'Sugar level(mg/dl)',
                        style: {
                            color: "#2b908f",
                            fontSize: "13px"
                        }
                    },
                    opposite: true

                },

                    {
                        gridLineWidth: 0,
                        title: {
                            text: 'Detection level',
                            style: {
                                color: "#f45b5b",
                                fontSize: "13px"

                            }
                        },
                        labels: {
                            format: '{value}',
                            style: {
                                color: "#f45b5b",
                                fontSize: "13px"
                            }
                        },
                        opposite: false
                    },
                ],

                series: [{
                    type: 'column',
                    name: 'Sugar1',
                    data: sugar1,
                    yAxis: 0,
                    color: "#aaeeee",
                    tooltip: {
                        valueSuffix: 'mg/dl'
                    }

                }, {
                    type: 'column',
                    name: 'Sugar2',
                    data: sugar2,
                    yAxis: 0,
                    color: "#90ee7e",
                    tooltip: {
                        valueSuffix: 'mg/dl'
                    }

                }, {
                    type: 'spline',
                    name: 'Result level',
                    data: result,
                    yAxis: 1,
                    color: "#f45b5b"

                }
                ]

            });
            Highcharts.setOptions(Highcharts.theme);

        }

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
        }

        function actOnSuccess(response) {
            $location.path('/');
            reset();
        }

        function actOnError(reason) {
            console.log('Failed: ' + reason);
        }

        reset();

        $scope.doSubmit = function () {
            var newUser = JSON.parse(JSON.stringify($scope.user));
            delete newUser['repassword'];

            UserService.create(newUser).then(actOnSuccess, actOnError);
        };

        $scope.takePicture = function () {
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

            $cordovaCamera.getPicture(options).then(
                function (imageData) {
                    $scope.srcImage = "data:image/jpeg;base64," + imageData;
                },
                function (err) {
                    $ionicPopup.alert({
                        title: JSON.parse(err),
                        okText: 'Try Again'
                    });
                }
            );
        };
    })

    /**
     * Login - Cuong
     */
    .controller('LoginCtrl', function ($scope, $location, $ionicPopup, UserService) {
        function reset() {
            $scope.credential = {'email': '', 'password': ''};
        }

        function actOnSuccess(response) {
            if (response.data.length === 1) {
                var user = response.data[0];

                sessionStorage.setItem("userID", user['id']); // Changes done by Tarun to store User ID (from mongoDB) session
                sessionStorage.setItem("userID", user['name']);

                $location.path('/home/' + user['name']);
            } else {
                var alertPopup = $ionicPopup.alert({
                    title: 'Wrong Credentials',
                    okText: 'Try Again'
                });
                alertPopup.then(function () {
                    reset();
                });
            }
        }

        function actOnError(reason) {
            var alertPopup = $ionicPopup.alert({
                title: 'Check your connection ',
                okText: 'Try Again'
            });
            alertPopup.then(function () {
                reset();
            });
        }

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

    /**
     * Overweight - Cuong
     */
    .controller('OverweightDetectionCtrl', function ($scope, $ionicPopup, OverweightDetectionService) {
        function reset() {
            $scope.diagnosis = {
                height         : '_ _ _',
                weightLbs      : '_ _ _',
                bmi            : '_ _ _ _ _',
                result         : '_ _ _',
                gender         : '_ _ _',
                healthyWeight  : '_ _ _',
                healthyCalories: '',
                nextCheckupDate    : ''
            };

            $scope.form = {
                hidden: false
            };

            $scope.body_measurement = {};
        }

        reset();

        function actOnSuccess(response) {
            var data = response.data;

            $scope.diagnosis['gender'] = data['gender'];
            $scope.diagnosis['result'] = data['diagnosis'];
            $scope.diagnosis['weightLbs'] = data['weightLbs'] + " .lbs";
            $scope.diagnosis['bmi'] = parseFloat(data['bmi']).toFixed(2) + " BMI";
            $scope.diagnosis['height'] = Math.floor(data['heightInch'] / 12) + "' " + data['heightInch'] % 12 + '"';
            $scope.diagnosis['healthyWeight'] = data['healthyWeightLowerLbs'] + ' - ' + data['healthyWeightUpperLbs'] + ' .lbs';
            $scope.diagnosis['healthyCalories'] = data['healthyCaloriesLower'] + ' - ' + data['healthyCaloriesUpper'] + ' .cal';
            $scope.diagnosis['checkupDate'] = new Date().toLocaleDateString();
            $scope.diagnosis['nextCheckupDate'] = new Date(new Date().getTime() + 8 * 24 * 60 * 60 * 1000).toDateString().split(' ').slice(1, 4).join(' ');

            $scope.form.hidden = true;
        }

        function actOnError(response) {
            console.log(response);
        }

        $scope.toggleSelectStyle = function() {
            console.log($scope.body_measurement.gender);
        };

        $scope.showForm = function () {
            reset();
        };

        $scope.detect = function () {
            if ($scope.body_measurement.gender && $scope.body_measurement.weightLbs) {
                var measurement = {
                    gender: $scope.body_measurement.gender,
                    weightLbs: $scope.body_measurement.weightLbs,
                    heightInch: 12 * parseInt($scope.body_measurement.heightInFeet) + parseInt($scope.body_measurement.heightInInch)
                };

                OverweightDetectionService.detect(measurement).then(actOnSuccess, actOnError);
            }
        }
    })

    .controller('OverweightHistoryCtrl', function ($scope, $window, OverweightHistoryService) {
        $scope.Math = $window.Math;

        function byDate(lhs, rhs) {
            return lhs.x - rhs.x;
        }

        function toDataPoint(datum) {
            return {
                x: new Date(Date.parse(datum['detectedDate'])),
                y: datum['weightLbs']
            };
        }

        function toTimelineRow(datum, idx, records) {
            return {
                recordedDate: new Date(Date.parse(datum['detectedDate'])).toISOString().split('T')[0],
                weightInLbs: datum['weightLbs'],
                weightDiff: (idx + 1) < records.length ? datum['weightLbs'] - records[idx + 1]['weightLbs'] : 0
            };
        }

        function actOnSuccess(result) {
            var records = result.data.records;

            $scope.dataPoints = records.slice(0, 7).map(toDataPoint).sort(byDate);

            $scope.records = records.map(toTimelineRow).slice(0, 7);
        }

        function actOnError(cause) {
            console.log(cause);
        }

        OverweightHistoryService.recentHistory("5642c0c299fd4c0080e9666d").then(actOnSuccess, actOnError);
    });