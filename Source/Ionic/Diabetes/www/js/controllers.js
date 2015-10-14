angular.module('starter.controllers', [])

.controller('DashCtrl', function($scope,$http, $httpParamSerializerJQLike) {
    $scope.pageClass = 'validate';  
    $scope.validate = function(username, password){
        console.log("inside login function");
        $http({
            method: 'GET',
            url: 'https://api.mongolab.com/api/1/databases/ase/collections/users?q={"name": "' + username + '", "psd": "' + password + '"}&apiKey=TFqu35e8BmE9SBB3fRgCe6MpqUcqKWBi',           
            contentType: "application/json"
        }).success (function(data) {
            console.log(data);
            if(data!=""){
                window.location.assign("#/tab/dash/DiabetesDetector");
                sessionStorage.setItem("userID", data["0"]._id.$oid);
            }
            else $scope.msg ="Incorrect username or password!";
        })            
    }
})

.controller('Upd', function($scope,$http, $httpParamSerializerJQLike) { 
    $scope.pageClass = 'update';
    $scope.update = function(NewPassword){
        console.log("inside update function");
        $http({
            method: 'PUT',
            url: 'https://api.mongolab.com/api/1/databases/ase/collections/users/'+ sessionStorage.getItem("userID")+'?apiKey=TFqu35e8BmE9SBB3fRgCe6MpqUcqKWBi',
            data: JSON.stringify( { "$set" : { "psd" : NewPassword } } ),
            contentType: "application/json"
        }).success (function(data) { 
            console.log(data);
            $scope.msg ="Password has been updated!";
        })
    }
    
        $scope.delete = function(){
        console.log("inside delete function");
        $http({
            method: 'DELETE',
            url: 'https://api.mongolab.com/api/1/databases/ase/collections/users/'+ sessionStorage.getItem("userID")+'?apiKey=TFqu35e8BmE9SBB3fRgCe6MpqUcqKWBi',
            contentType: "application/json"
        }).success (function(data) { 
            $scope.msg ="Account has been deleted!";
        })
    }
})
                    
        

.controller('DiaDet', function($scope, $http){
    $scope.diaDetectLogic = function(diaData1,diaData2) {
        // Do some computation..
        var diaValue1=parseFloat(diaData1);
        console.log(diaValue1);
        var diaValue2=parseFloat(diaData2);
        console.log(diaValue2);
        if (isNaN(diaValue1) || isNaN(diaValue2))
            return{
                
               "classNameForResult": "codered", 
               "results": "Please enter the values correctly." 
            }
        
        console.log("record the parameters");
        $http({
            method: 'PUT',
             url: 'https://api.mongolab.com/api/1/databases/ase/collections/users/'+ sessionStorage.getItem("userID")+'?apiKey=TFqu35e8BmE9SBB3fRgCe6MpqUcqKWBi',
            data: JSON.stringify({
                 "$set" : { 
                     "sugarFast" : diaValue1,
                     "sugar2H": diaValue2 } 
            }),
            contentType: "application/json"
        }).success (function(data) { 
            console.log(data);

        })
        
        
        if(diaValue1<110 && diaValue2<140){
        return {
            "classNameForResult": "card",
            "classNameForSuggestion": "bar bar-footer bar-balanced",
            "results": "Normal"
        }
        }
          if(diaValue1<126 && diaValue1>=110 && diaValue2<140)
              return{
            "classNameForResult": "card",
            "classNameForSuggestion": "bar bar-footer bar-balanced",
            "results": "Impaired fasting glycaemia glucose: more commonly known as pre-diabetes refers to a condition in which the fasting blood glucose level is consistently elevated above what is considered normal levels; however, it is not high enough to be diagnosed as diabetes mellitus."                  
    }
            if(diaValue1<126 && diaValue2>=140 && diaValue2<200)
                return{
                "classNameForResult": "card",
            "classNameForSuggestion": "bar bar-footer bar-balanced",
            "results":"Impaired glucose tolerance(IGT): is a pre-diabetic state of hyperglycemia that is associated with insulin resistance and increased risk of cardiovascular pathology. IGT may precede type 2 diabetes mellitus by many years. IGT is also a risk factor for mortality."    
                    
                }
              if (diaValue1>=126 || diaValue2>=200)
                  return{
                  "classNameForResult": "card",
            "classNameForSuggestion": "bar bar-footer bar-balanced",
            "results":"Diabetes mellitus: A positive result, in the absence of unequivocal high blood sugar, should be confirmed by a repeat of any of the above methods on a different day. It is preferable to measure a fasting glucose level because of the ease of measurement and the considerable time commitment of formal glucose tolerance testing, which takes two hours to complete and offers no prognostic advantage over the fasting test.According to the current definition, two fasting glucose measurements above 126 mg/dl (7.0 mmol/l) is considered diagnostic for diabetes mellitus."
                  }
                  }
              
    $scope.diaDetectView = function(style) {
        document.getElementById("result").className = style["classNameForResult"];      document.getElementById("suggestion").className=style["classNameForSuggestion"];
        console.log(style["classNameForSuggestion"]);
        document.getElementById("result").innerHTML=style["results"];
        
        
//        $cordovaToast
//        .show("Detection is recorded", 'short', 'center')
//        .then(function(success) {
//            console.log('Success');
//        }, function (error) {
//            console.log('Error');
//        });

    }
    $scope.clearSearch = function () {
        $scope.diaData1 = "";
        $scope.diaData2 = "";
    };
})


.controller('RegistCtrl', function($scope, $http, $httpParamSerializerJQLike){
    $scope.pageClass = 'register';
    $scope.register = function(email, username, password) {
        console.log("inside register function");
        $http({
            method:'GET',
            url:'https://api.mongolab.com/api/1/databases/ase/collections/users?q={"name": "' + username + '"}&apiKey=TFqu35e8BmE9SBB3fRgCe6MpqUcqKWBi',
        }).success(function(data){
            console.log(data);
            if (data!=""){
                $scope.msg ="Username already picked, choose another one!"
            }
            else {
                $http({
                    method: 'POST',
                    url : 'https://api.mongolab.com/api/1/databases/ase/collections/users?apiKey=TFqu35e8BmE9SBB3fRgCe6MpqUcqKWBi',
                    data: JSON.stringify({
                        e_mail:email,
                        name: username,
                        psd: password,
                        sugarFast:null,
                        sugar2H:null
                    }),
                    contentType: "application/json"
                }).success(function(data) { 
                    console.log(data._id.$oid);
                    $scope.msg ="User created successfully";
                })
            }
        })
    }
});

