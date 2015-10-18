// angular.module is a global place for creating, registering and retrieving Angular modules
// 'app' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'app.services' is found in services.js
// 'app.controllers' is found in controllers.js

angular.module('app', ['ionic', 'app.controllers', 'app.services'])

.config(function($stateProvider, $urlRouterProvider) {
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
      url: '/diabetes',
      controller: 'DiaDet',
      templateUrl: 'templates/diabetes.html',
    });

  // If none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/');
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