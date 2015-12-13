// Git
// angular.module is a global place for creating, registering and retrieving Angular modules
// 'app' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'app.services' is found in services.js
// 'app.controllers' is found in controllers.js

angular.module('app', ['ionic', 'app.controllers', 'app.services', 'ngCordova', 'chart.js', 'ui.router'])

.config(function($stateProvider, $urlRouterProvider, $compileProvider) {
  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  
  $stateProvider
    .state('splash', {
      url: '/',
      templateUrl: 'templates/splash.html',
    })

    .state('login', {
      url: '/login',
      controller: 'LoginCtrl',
      templateUrl: 'templates/login.html',
    })
    
    .state('signup', {
      url: '/signup',
      controller: 'SignupCtrl',
      templateUrl: 'templates/signup.html',
    })
	
	.state('suggestHP', {
      url: '/suggestHP',
      controller: 'SliderController',
      templateUrl: 'templates/suggestHP.html',
    })
	
	 .state('videoHP', {
      url: '/videoHP',
      controller: 'VideoController',
      templateUrl: 'templates/movieHP.html',
    })
    
    .state('historyHP', {
      url: '/historyHP',
      controller: 'HypertensionHistoryController',
      templateUrl: 'templates/historyHP.html',
    })
    
    .state('home', {
      url: '/home/:name',
      controller: 'HomeCtrl',
      templateUrl: 'templates/home.html',
    })
    
    .state('hypertension', {
      url: '/hypertension',
      controller: 'Hypertension',
      templateUrl: 'templates/hypertension.html',
    })
      
    .state('diabetes', {
      url: "/diabetes",
      abstract: true,
      templateUrl: "templates/diabetes_menu.html"
  })
  
    .state('diabetes.detection', {
      url: '/detection',
      views: {
          menuContent: {
              controller: 'DiaDet',
              templateUrl: 'templates/diabetes_detection.html'
          }
      }
  })
      
    .state('diabetes.suggestion', {
      url: '/suggestion',
      views: {
          menuContent: {
              controller: 'DiaSug',
              templateUrl: 'templates/diabetes_suggestion.html'
          }
      }
  })
    .state('diabetes.history', {
      url: '/history',
      views: {
          menuContent: {
              controller: 'DiaHistory',
              templateUrl: 'templates/diabetes_history.html'
          }
      }
  })
  
    .state('overweight', {
      url: '/overweight',
      controller: 'Overweight',
      templateUrl: 'templates/overweight.html',
    })
    
    .state('nutrition', {
      url: '/overweight/nutrition',
      templateUrl: 'templates/overweight_nutrition.html',
    });

  // If none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/');
})

.directive('slider', function ($timeout) {
  return {
    restrict: 'AE',
	replace: true,
	scope:{
		images: '='
	},
    link: function (scope, elem, attrs) {

		scope.currentIndex=0;

		scope.next=function(){
			scope.currentIndex<scope.images.length-1?scope.currentIndex++:scope.currentIndex=0;
		};
		
		scope.prev=function(){
			scope.currentIndex>0?scope.currentIndex--:scope.currentIndex=scope.images.length-1;
		};
		
		scope.$watch('currentIndex',function(){
			scope.images.forEach(function(image){
				image.visible=false;
			});
			scope.images[scope.currentIndex].visible=true;
		});
		
		/* Start: For Automatic slideshow*/
		
		var timer;
		
		var sliderFunc=function(){
			timer=$timeout(function(){
				scope.next();
				timer=$timeout(sliderFunc,5000);
			},5000);
		};
		
		sliderFunc();
		
		scope.$on('$destroy',function(){
			$timeout.cancel(timer);
		});
		
		/* End : For Automatic slideshow*/
		
    },
	templateUrl:'templates/templateurl.html'
  }
})

.directive('validated', function($parse) {
    return {
      restrict: 'AEC',
      require: '^form',
      link: function(scope, element, attrs, form) {
        var inputs = element.find("*");
        
        for(var i = 0; i < inputs.length; i++) {
          (function(input){
            var attributes = input.attributes;
            
            if (attributes.getNamedItem('ng-model') != void 0 && attributes.getNamedItem('name') != void 0) {
              var field = form[attributes.name.value];
              
              if (field != void 0) {
                scope.$watch(function() {
                  return form.$submitted + "_" + field.$valid;
                }, function() {
                  if (form.$submitted != true) return;
                  
                  var inp = angular.element(input);
                  
                  if (inp.hasClass('ng-invalid')) {
                    element.removeClass('has-success');
                    element.addClass('has-error');
                  } else {
                    element.removeClass('has-error').addClass('has-success');
                  }
                });
              }
            }
          })(inputs[i]);
        }
      }
    }
});