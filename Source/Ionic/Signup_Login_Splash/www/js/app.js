angular.module('app', ['ionic'])

.config(function($stateProvider, $urlRouterProvider) {

  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  $stateProvider
  
  .state('hypertension', {
    url: "/hypertension",
    templateUrl: "hypertension.html"
  })

  .state('splash', {
    url: '/splash',
    templateUrl: "splash.html"
  })
  
    // setup an abstract state for the tabs directive
  .state('login', {
    url: "/login",
    templateUrl: "login.html"
  })
  
      // setup an abstract state for the tabs directive
  .state('signup', {
    url: "/signup",
    templateUrl: "signup.html"
  });
    
    // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/splash');

})

.controller('Hypertension', function($scope){
    $scope.detectLogic = function(sbp,dbp) {
        // Do some computation..
        var sbpValue=parseFloat(sbp);
        
        var dbpValue=parseFloat(dbp);
        
       
        var flag = parseInt(nameValue);
        
        if (isNaN(sbpValue) || isNaN(dbpValue))
            return{
                
               "classNameForResult": "codered", 
               "results": "Please enter the values correctly." 
            }
        
        if(sbpValue<110 && dbpValue<140)
                return {
            
                "classNameForResult": "codegreen",
                "classNameForSuggestion": "bar bar-footer bar-balanced",
                "results": "Normal : You don't have hypertension."   
                }
            
        if(sbpValue>=120 && sbpValue<=139 && dbpValue<90)
               return{
            "classNameForResult": "card",
            "classNameForSuggestion": "bar bar-footer bar-energized",
            "results": "You have Pre-Hypertension."                  
               }
               
        if(sbpValue>=140 && sbpValue<=159 && dbpValue>=100)
               return{
            "classNameForResult": "card",
            "classNameForSuggestion": "bar bar-footer bar-energized",
            "results": "You have State 1 Hypertension."                  
               } 
               
               
        if(sbpValue>=160 && sbpValue<=179 && dbpValue>=110)
               return{
            "classNameForResult": "card",
            "classNameForSuggestion": "bar bar-footer bar-energized",
            "results": "You have State 2 Hypertension."                  
               }        
               
              if (sbpValue>=180 || dbpValue>=110)
                  return{
                      
                  "classNameForResult": "codered",
            "classNameForSuggestion": "bar bar-footer bar-assertive",
            "results":"You have stage 3 Hypertension (severe)."
                     
                  }
    }
              
    $scope.detectView = function(style) {
        document.getElementById("result").className = style["classNameForResult"]; 
		document.getElementById("suggestion").className=style["classNameForSuggestion"];
        //console.log(style["classNameForSuggestion"]);
        document.getElementById("result").innerHTML=style["results"];

    }  

    
  
        
        
});
